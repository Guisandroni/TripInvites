import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from 'zod'
import { prisma } from "../lib/prisma";
import dayjs from 'dayjs'
import { getMailClient} from "../lib/mail"  
import nodemailer from 'nodemailer'

export async function ViagemCriada (app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post('/viagens', {
        schema:{    
            //validação
            body: z.object({
                destination: z.string().min(4),
                inicio_at: z.coerce.date(), //coerce converte o valor para outro , no caso de string para data
                final_at: z.coerce.date(),
                nome_criador: z.string(),
                email_criador:z.string().email(),
                emails_to_invite: z.array(z.string().email()),
                nome_convidado:z.array(z.string()),
            })
        }

    },async(request)=>{
        const {destination, inicio_at, final_at, nome_criador, email_criador,emails_to_invite, nome_convidado} = request.body

        //validação de datas usando dayjs
        if ( dayjs(inicio_at).isBefore(new Date())){
            throw new Error ('Data Inicio Inválida')
        }   

        if ( dayjs(final_at).isBefore(inicio_at)){
            throw new Error ('Data Final Inválida')
        }


        const viagem = await prisma.viagem.create({
            data:{
                destination,
                inicio_at,
                final_at,
                participantes:{
                    createMany:{
                        data: [
                            {
                                nome: nome_criador,
                             
                                email: email_criador,
                                is_owner: true,
                                is_confirmado: true,
                            },

                            ...emails_to_invite.map((email, index) => ({
                                nome: nome_convidado[index] || 'Convidado Desconhecido',
                                email,                        
                            }))
                        ]
                    }
                }
                
            }
        })

         



        const mail = await getMailClient()


        // teste envio de email
        //de quem 
        //para quem
        // resultado do teste
       const mensagem =  await mail.sendMail({

            from:{
                name: 'Project Manager',
                address: 'ProjectManager@gmail.com',
            },
            to:{
                name: nome_criador,
                address: email_criador,
            },
            subject: 'Testando envio do email',
            html: `<p>Teste envio email </p>`
        })

        console.log(nodemailer.getTestMessageUrl(mensagem))

        return {
           viagemId: viagem.id
        }
    })
}