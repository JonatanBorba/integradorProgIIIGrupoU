// import ReservasServicios from "../servicios/reservas.servicios.js";


// export default class ReservasControlador {
//     constructor () { 
//         this.reservasServicio = new ReservasServicios();
        
//     }
//     postReservas = async(req, res) => {
//         const {fecha, salon_id, usuario_id, tematica, importe_total} = req.body;
//         if( !salon_id || !usuario_id || !tematica || !importe_total ){
//             return res.status(400).json({mensaje: 'Faltan datos obligatorios'});
//         }
//          if(typeof fecha !== 'number' || typeof salon_id !== 'number' || typeof usuario_id !== 'number' || typeof tematica !== 'string' || typeof importe_total !== 'number' ){
//              return res.status(400).json({mensaje: 'El tipo de dato de algun campo es incorrecto'});
//         }
//         const nuevaReserva = await this.reservasServicio.agregarReserva({fecha, salon_id, usuario_id, tematica, importe_total});
//         res.status(201).json(nuevaReserva);

//     };
//     getObtenerReservaPorId = async(req, res) => {
//         const idConsultar = req.params.id;
//         const reservas = await this.reservasServicio.obtenerReservaPorId(idConsultar);
//         reservas ? res.status(200).json(reservas) : res.status(404).json({mensaje: 'Reserva no encontrada'});


//     };
//     getReservas = async(req, res) => { 
//         const reservas = await this.reservasServicio.obtener();
//         reservas ? res.status(200).json(reservas) : res.status(404).json({mensaje: 'No hay reservas para mostrar'});

//     };
//     putReservasPorId = async(req, res) => {    
//         const idModificar = req.params.id;
//         const reservasModificar = await this.reservasServicio.modificarPorId(idModificar, req.body);
//        reservasModificar ? res.status(200).json(reservasModificar) : res.status(404).json({mensaje: 'Reserva no encontrada'});

//     };
//     deleteReservaPorId = async(req, res) => {
//         const eliminar = await this.reservasServicio.eliminarPorId(req.params.id);
//         if (eliminar) {
//             res.status(200).json({mensaje: 'Reserva eliminada'});
//         } else {
//             res.status(404).json({mensaje: 'Reserva no encontrada'});
//         }
//     };    
// }