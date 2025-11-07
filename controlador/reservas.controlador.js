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

            const nuevaReserva = await this.reservasServicio.crear(reserva, req.user)

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
    buscarTodos = async (req, res) => {
        try {
            const reservas = await this.reservasServicio.buscarTodos(req.user);
            res.json({ estado: true, datos: reservas });
        } catch (err) {
            console.log('Error en GET /reservas', err);
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
    informe = async (req, res) => {
        try{
            const formatosPermitidos = ['pdf', 'csv'];
            const formato = req.query.formato;

            if(!formato || !formatosPermitidos.includes(formato)){
                return res.status(400).send({
                    estado:"Falla",
                    mensaje: "Formato inválido para el informe."    
                });
            }
            const resultado = await this.reservasServicio.generarInforme(formato);
            if (!resultado) {
                return res.status(400).send({ estado: "Falla", mensaje: "Formato no soportado." });
            }
            const { buffer, path, headers } = resultado;
            res.set(headers);
            if (formato === 'pdf') {
                return res.status(200).end(buffer);
            } else if (formato === 'csv') {
                return res.status(200).download(path, (err) => {
                    if (err) {
                        return res.status(500).send({ estado:"Falla", mensaje: "No se pudo generar el informe." });
                    }
                });
            }
        }catch(error){
            console.log(error);
            res.status(500).send({ estado:"Falla", mensaje: "Error interno en servidor." });
        }
    }


    deleteReservaPorId = async(req, res) => {
        try {
            const { reserva_id } = req.params;
            // verifico que la reserva exista
            const reservaExistente = await this.reservasServicio.buscarPorId(reserva_id);
            if (!reservaExistente) {
                return res.status(404).json({ estado: false, mensaje: 'Reserva no encontrada' });
            }
            //solo administadores pueden eliminar cualquier reserva
            // los clientes solo pueden eliminar sus propias reservas
        
            if (req.user.tipo_usuario === 3 && reservaExistente.usuario_id !== req.user.usuario_id) {
                return res.status(403).json({ estado: false, mensaje: 'No autorizado para eliminar esta reserva' });
            }
            const eliminar = await this.reservasServicio.eliminarPorId(reserva_id);
            if(eliminar) {
                return res.status(200).json({ estado: true, mensaje: 'Reserva eliminada correctamente' });
            } else {
                return res.status(500).json({ estado: false, mensaje: 'Error al eliminar la reserva' });
            }
        } catch (error) {
            console.log('Error en DELETE /reservas/:id', error);
            res.status(500).json({ estado: false, mensaje: 'Error interno del servidor.' });
        }
    }



}