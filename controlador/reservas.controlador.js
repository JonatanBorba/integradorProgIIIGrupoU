 import ReservasServicios from "../servicios/reservas.servicios.js";


 export default class ReservasControlador {
     constructor () { 
         this.reservasServicio = new ReservasServicios();
     }        
crear = async (req, res) => {
        try {
            
            const {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total,
                servicios } = req.body;

            const reserva = {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total, 
                servicios
            };

            const nuevaReserva = await this.reservasServicio.crear(reserva)

            if (!nuevaReserva) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Reserva no creada'
                })
            }

            res.json({
                estado: true, 
                mensaje: 'Reserva creada!',
                salon: nuevaReserva
            });
    
        } catch (err) {
            console.log('Error en POST /reservas/', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }
    buscarPorId = async (req, res) => {
        try {
            const reserva_id = req.params.reserva_id;
            const reserva = await this.reservasServicio.buscarPorId(reserva_id);

            if (!reserva) {
                return res.status(404).json({
                    estado: false,
                    mensaje: 'Reserva no encontrada.'
                })
            }

            res.json({
                estado: true, 
                reserva: reserva
            });
    
        } catch (err) {
            console.log('Error en GET /reservas/reservas_id', err);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor.'
            });
        }
    }
}


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