export  type Usuario = {
    username : string,
    password: string,
    id: string
}
export enum Estado{
    OCUPADO = "Ocupado",
    LIBRE = "Libre",
}
export type Coche = {
    matricula: string,
    seats: number,
    estado: Estado,
    id:string,
}