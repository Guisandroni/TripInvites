import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";



export const tripConfirmLink = async (request:FastifyRequest, reply:FastifyReply) =>{
    
    try {
        const schema =  z.object({
        tripId: z.string().uuid(),
       
    })
    const {tripId} = schema.parse(request.params);
     


    const trip = await prisma.trip.findUnique({
        where:{
            id: tripId,
        },
        include:{
            Participant: {
                where: {
                    tripId: tripId,
                     is_owner: false,
                },
            },
        }
    })

    if (!trip){
        return reply.status(404).send({error:"Trip not found"})
    }

    if(trip.isConfirmed){  
        return reply.redirect(`http://localhost:8000/trips/${tripId}`);
    }

    await prisma.trip.update({
        where: { id: tripId },
        data: { isConfirmed: true },
    });

  const urlTripConfirm = `http://localhost:8080/trips/register/${trip.id}/confirm/${Id_Participante}`;



    return {tripId : tripId};

    } catch (error) {
        if(error instanceof z.ZodError){
            return reply.status(400).send({error: "Invalid tripId format"})
        }

        return reply.send(500).send({error: "Internal server error"})
    }
    }

//    return reply.status(200).send({message:"Trip confirmed successfully", tripId});



    /*
const { tripId } = request.params as { tripId: string };

    // Verifica se a viagem existe
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId,
        },
        include: {
            Participant: true,
        },
    });

    if (!trip) {
        return reply.status(404).send({ error: "Trip not found" });
    }

    // Marca o participante como confirmado
    const participant = await prisma.participant.updateMany({
        where: {
            tripId: trip.id,
            email: request.query.email as string, // Assume que o email é passado como query parameter
        },
        data: {
            is_confirmed: true,
        },
    });

    if (participant.count === 0) {
        return reply.status(404).send({ error: "Participant not found or already confirmed" });
    }

    return reply.status(200).send({ message: "Trip confirmed successfully" });

    */