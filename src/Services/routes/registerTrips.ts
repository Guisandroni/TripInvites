import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import {z} from "zod"
import dayjs from "dayjs";
import { getEmailClient } from "../../lib/email";
import nodemailer from "nodemailer"
export const registerTrip = async (request: FastifyRequest, reply:FastifyReply) =>{

    //body da validadao dos dados
    const schema = 
         z.object({
        destination: z.string().min(4),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
       OwnerName: z.string(),
        OwnerEmail: z.string().email(),
    })

    // Extraindo os dados validados
    const { destination, startDate, endDate, OwnerName, OwnerEmail } = schema.parse(request.body)
    //validando data usando lib dayJs
    if(dayjs(startDate).isBefore(new Date())){
        throw new Error("Invalid trip date")
    }
    if(dayjs(endDate).isBefore(startDate)){
        throw new Error("Invalid trip date")
    }
    const data = await prisma.trip.create({
        data:{
            destination,
            startDate,
            endDate,
            Participant:{ // da insert direto na tabela de participante, por conta da relacao
                create:{
                    name: OwnerName,
                    email: OwnerEmail,
                    is_confirmed: true,
                    is_owner: true,
                }
            }
        }
    })

    //passando dados para envio do email
    const email = await getEmailClient()
   const messageEmail = await email.sendMail({
        from:{
            name:"Equipe da trips Invite",
            address:"tripsInvite@gmail.com",

        },
        to:{
            name: OwnerName,
            address: OwnerEmail,
        },
        subject: "Trip Registered Successfully",
        html: `<p>Your trip to ${destination} has been successfully registered!</p>`,
    })

    console.log(nodemailer.getTestMessageUrl(messageEmail))
    return reply.status(201).send({
        tripId: data.id,
        message: "Trip registered successfully",
    })
}
