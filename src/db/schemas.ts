import { ObjectId } from "mongo";
import { Coche, Usuario } from "../types.ts";

export type usuarioSchema = Omit<Usuario, "id"> & {
    _id:ObjectId,
}
export type cocheSchema = Omit<Coche,"id"> & {
    _id: ObjectId,
}