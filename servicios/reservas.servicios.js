// import ReservasDB from "../db/reservasDB.js";

// export default class ReservasServicios {
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

