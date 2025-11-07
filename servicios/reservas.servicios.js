import ReservasDB from "../db/reservasDB.js";
import ReservasServiciosDB from "../db/reservas_servicioDB.js";
import ComentariosDB from "../db/comentariosDB.js";
import NotificacionesServicio from "./notificacionesServicios.js";
import InformeServicio from "./informesServicio.js";

export default class ReservasServicios {
    constructor(){
        this.reservasDB = new ReservasDB();
        this.reservas_serviciosDB = new ReservasServiciosDB();
        this.comentariosDB = new ComentariosDB();
        this.notificacionesServicios = new NotificacionesServicio();
        this.informes = new InformeServicio();
    }

    buscarTodos = (usuario) => {
        if (usuario && Number(usuario.tipo_usuario) < 3) {
            return this.reservasDB.buscarTodos();
        }
        // clientes (rol 3) ven solo sus reservas
        if (usuario?.usuario_id) {
            return this.reservasDB.buscarPropias(usuario.usuario_id);
        }
        return [];
    }

    buscarPorId = async (reserva_id) => {
        const reserva = await this.reservasDB.buscarPorId(reserva_id);
        if (!reserva) return null;
        try {
            const comentarios = await this.comentariosDB.obtenerPorReserva(reserva_id);
            reserva.comentarios = comentarios || [];
        } catch (e) {
            reserva.comentarios = [];
        }
        return reserva;
    }

    crear = async (reserva, usuarioAuth = null) => {
        
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

        const result = await this.reservasDB.crear(nuevaReserva);

        if (!result) {
            return null;
        }

        // Asociar servicios a la reserva
        await this.reservas_serviciosDB.crear(result.reserva_id, servicios);     

        // Notificación por correo 
        try {
            const fila = await this.reservasDB.datosParaNotificacion(result.reserva_id);
            // Normalizar campos esperados por el servicio de notificaciones
            const datosCorreo = {
                fecha: fila?.fecha || fila?.fecha_reserva || null,
                salon: fila?.salon || fila?.titulo || fila?.salon_titulo || null,
                turno: fila?.turno || fila?.turno_nombre || String(fila?.turno_id ?? ''),
                // email del cliente
                correoCliente: (usuarioAuth?.nombre_usuario) || fila?.correoCliente || fila?.correoElectronico || fila?.email || fila?.nombre_usuario || null,
                // opcional: admins por ENV si no se provee desde la DB
                correosAdmin: []
            };
            await this.notificacionesServicios.enviarCorreo(datosCorreo);
        } catch (notificationError) {
            console.log('Advertencia: No se pudo enviar el correo.');
            console.error('[MAIL] Error en envío tras crear reserva:', notificationError?.message);
            if (notificationError?.stack) {
                console.error(notificationError.stack);
            }
        }

        // RETORNO LA RESERVA CREADA
        return this.reservasDB.buscarPorId(result.reserva_id);
    }

    informe = async () => {
        return this.reservasDB.informe();
    }

    generarInforme = async (formato) => {
        if (formato === 'pdf') {
            const datosReporte = await this.reservasDB.buscarDatosReporteCsv();
            const pdf = await this.informes.informeReservasPdf(datosReporte);
            return {
                buffer: pdf,
                headers:{
                    'Content-Type' : 'application/pdf',
                    'Content-Disposition' : 'inline; filename="reporte3010.pdf"'
                }
            };
        } else if (formato === 'csv'){
            const datosReporte = await this.reservasDB.buscarDatosReporteCsv();
            const csv =  await this.informes.informeReservasCsv(datosReporte);
            return {
                path: csv,
                headers:{
                    'Content-Type' : 'text/csv',
                    'Content-Disposition' : 'attachment; filename="reporte.csv"'
                }
            };
        }
        return null;
    };
    eliminarPorId = async (id) => {
        try {
            const existeReserva = await this.buscarPorId(id);
            if (!existeReserva) { 
                return null;
            }
            
            const eliminado = await this.reservasDB.eliminarPorId(id);
            
            if (eliminado) {
                return { mensaje: 'Reserva eliminada correctamente' };
            } else {
                throw new Error('No se pudo eliminar la reserva');
            }       
        } catch (error) {
            throw new Error('Error al eliminar la reserva: ' + error.message);      
        }
 
    }; 
    
}    



   

