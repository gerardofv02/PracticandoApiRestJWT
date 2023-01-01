import { RouterContext } from "router";
import { usuarioSchema} from "../db/schemas.ts";
import { Usuario } from "../types.ts";
import { usuariosCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

type PostUserContext = RouterContext<
    "/addUser",
    Record<string | number, string | undefined>,
    Record<string, any>
>;


export const addUser = async (context: PostUserContext)=> {
    try {
      const result = context.request.body({ type: "json" });
      const value = await result.value;
      if (!value?.username|| !value?.password ){
        context.response.body = 404;
        context.response.body = {message: "No ha introducido bien las caracteristicas del usuario"};
      }
      else{
        const find = await usuariosCollection.findOne({username: value.username});
        if(find){
            context.response.body = 404;
            context.response.body = {message: "El usuario estaba ya en la base de datos"};
        }
        else{
            const hash = await bcrypt.hash(value.password);

            const user :Partial<Usuario> = {
                password: hash,
                
                username: value.username,
            };
            const id = await usuariosCollection.insertOne(user as usuarioSchema);

            context.response.body = {
                message: "Usuario añadido correctamente",
                username: user.username,
                password: user.password,

            };
        }

      }

  } catch (error) {
      context.response.status = 404;
      context.response.body = { message: "No se ha podido añadir el usuario a la base de datos", error: error };
  }
}


  
