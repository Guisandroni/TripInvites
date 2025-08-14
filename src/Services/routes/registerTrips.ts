import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import {z} from "zod"
import dayjs from "dayjs";

export const registerTrip = async (request: FastifyRequest, reply:FastifyReply) =>{

    //body da validadao dos dados
    const schema = 
         z.object({
        destination: z.string().min(4),
        startDate: z.coerce.date(),
        endDate: z.coerce.date()
    })

    // Extraindo os dados validados
    const { destination, startDate, endDate} = schema.parse(request.body)

    if(dayjs(startDate).isBefore(new Date())){
        throw new Error("Invalid trip date")
    }
    if(dayjs(endDate).isBefore(startDate)){
        throw new Error("Invalid trip date")
    }
    const data = await prisma.trips.create({
        data:{
            destination,
            startDate,
            endDate
        }
    })

    return reply.status(201).send({
        tripId: data.id,
        message: "Trip registered successfully",
    })
}
