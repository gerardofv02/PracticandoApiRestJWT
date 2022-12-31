import{usuarioSchema} from "../db/schemas.ts"
export const Usuario = {
    id: (parent: usuarioSchema): string => parent._id.toString(),
};