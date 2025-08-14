import { FastifyInstance } from "fastify";
import { registerTrip } from "./routes/registerTrips";
import { listTrips } from "./routes/listTrips";
import { removeTrip } from "./routes/removeTrips";



export const appRoutes = async (app:FastifyInstance) =>{
    app.post('/trips/register', registerTrip )
    app.get('/trips/list', listTrips)
    app.delete('/trips/delete/:id', removeTrip)
}