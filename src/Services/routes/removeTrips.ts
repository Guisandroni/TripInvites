import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import z from "zod";


export const removeTrip = async (request:FastifyRequest, reply:FastifyReply) =>{
    const schema = z.object({
        id: z.string()
    })

    const {id} = schema.parse(request.params)

    const data = await prisma.trips.delete({
        where:{
            id:id
        }
    })

    return reply.status(200).send({
        status: "success trips deleted",
        data: data
    })
}