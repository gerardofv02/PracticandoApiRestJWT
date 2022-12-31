import { ObjectId } from "mongo";
import { Usuario } from "../types.ts";

export type usuarioSchema = Omit<Usuario, "id"> & {
    _id:ObjectId,
}