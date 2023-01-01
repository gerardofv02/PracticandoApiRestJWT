import { RouterContext } from "router";
import { usuarioSchema} from "../db/schemas.ts";
import { Usuario } from "../types.ts";
import { usuariosCollection} from "../db/mongo.ts";
import{ObjectId} from "mongo";
import * as bcrypt from "bcrypt";
import { getQuery } from "oakQuery";
import {createJWT} from "../utils/jwt.ts";


type LogInContext = RouterContext<
    "/login",
    Record<string | number, string | undefined>,
    Record<string, any>
>;







export const login= async (context:LogInContext) =>{
    try{
        const params = getQuery(context, { mergeParams: true });
        if(!params.username|| !params.password){
            context.response.status = 400;
            context.response.body = { message: "No se ha introducido correctamente los atributos"};
            return;
        }
        const user = await usuariosCollection.findOne({username: params.username});
        if(!user){
            context.response.status = 400;
            context.response.body = {message:"Usuario o encontrado en la bd"};
            return;
        }
        const verify = bcrypt.compare(user.password,params.password);

        if(!verify){
            context.response.status = 400;
            context.response.body = {message:"COntraseña incorrecta"};
        }

        const token = await createJWT({
            id: user._id.toString(),
            username: user.username,
            password : user.password,
        },
            Deno.env.get("JWT_SECRET")!
        );
        context.response.body = {token: token};

    }catch(error){
        context.response.status = 400;
        context.response.body = {message: "Error al obteenr el usuario", error:error};
    }
}