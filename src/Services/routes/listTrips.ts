import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma"


export const listTrips = async (request:FastifyRequest,reply:FastifyReply) =>{
    const data = await prisma.trips.findMany() //retornando todas as viagens

    return reply.status(200).send({data});
}
