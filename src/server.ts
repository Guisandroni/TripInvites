import fastify from "fastify";
import { ViagemCriada } from "./routes/viagem-criada";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify()



app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
 
app.register(ViagemCriada)



app.listen({port: 3333}).then(()=>{
    console.log('Servidor Rodando:')


})