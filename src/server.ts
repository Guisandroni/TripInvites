import fastify from "fastify";
import { env } from "process";
import { appRoutes } from "./Services/routes";


 const app = fastify();


app.register(appRoutes)

app.listen({port : 8080}).then(()=>{
    console.log(`Server is running on port 8080`)
})