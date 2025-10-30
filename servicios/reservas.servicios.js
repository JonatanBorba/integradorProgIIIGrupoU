import ReservasDB from "../db/reservasDB.js";
import ReservasServiciosDB from "../db/reservas_servicioDB.js";
import NotificacionesServicio from "./notificacionesServicios.js";

export default class ReservasServicios {
    constructor(){
        this.reservasDB = new ReservasDB();
        this.reservas_serviciosDB = new ReservasServiciosDB();
        this.notificacionesServicios = new NotificacionesServicio();
    }

    buscarTodos = () => {
        return this.reservasDB.buscarTodos();
    }

    buscarPorId = (reserva_id) => {
        return this.reservasDB.buscarPorId(reserva_id);
    }

    crear = async (reserva) => {
        
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total,
            servicios } = reserva;

        const nuevaReserva = {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero, 
            tematica,
            importe_salon,
            importe_total
        }    

        // SOLO CREO LA RESERVA
        const result = await this.reservasDB.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        // CREO LAS RELACIONES RESERVAS-SERVICIOS
        await this.reservas_serviciosDB.crear(result.reserva_id, servicios);     

        // BUSCO LOS DATOS PARA LA NOTIFICACION, LEYENDO DESDE LA BASE DE DATOS (DATOS CREADOS)
        const datosParaNotificacion = await this.reservasDB.datosParaNotificacion(result.reserva_id);
        
        // ENVIO NOTIFICACION 
        await this.notificacionesServicios.enviarCorreo(datosParaNotificacion);

        // RETORNO LA RESERVA CREADA
        return this.reservasDB.buscarPorId(result.reserva_id);
    }

    
}    









//     constructor () {
//         this.reservasDB = new ReservasDB();

//     }
//     agregarReserva = async(reservas) => {
//         try {
//             return await this.reservasDB.agregarReserva(reservas);

//         }catch (error) {
//             throw new Error('Error al agregar la reserva: ' + error.message);
//         }
      

//     };
//     obtenerReservaPorId = async(id) => { 
//         try {
//             return await this.reservasDB.obtenerPorId(id);
//         }catch (error) {
//             throw new Error('Error al obtener la resrva por ID' + error.message);
//         }
    

//     };
//     obtener = async() => {
//         try {
//             return await this.reservasDB.obtener();
//         }catch (error) {
//             throw new Error('Error al obtener las reservas: ' + error.message);
//         }
//     };
//     modificarPorId = async(id, body) => {
//         try {
//             const existeReserva = await this.obtenerReservaPorId(id);
//             if (!existeReserva) { 
//                 return null;
//             }
//             return await this.reservasDB.modificarPorId(id, body);
//         }catch (error) {
//             throw new Error('Error al modificar la reserva: ' + error.message);
//         }
//     };
//     eliminarPorId = async(id) => {
//         try {
//             const existeReserva = await this.obtenerReservaPorId(id);
//             if (!existeReserva) { 
//                 return null;
//             }
//             return await this.reservaDB.eliminarPorId(id);
//         }catch (error) {
//             throw new Error('Error al eliminar la reserva: ' + error.message);
//         }
//     };    
// };          

