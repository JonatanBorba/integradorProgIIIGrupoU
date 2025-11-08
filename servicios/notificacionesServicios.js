import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesServicio {
    enviarCorreo = async (datosCorreo) => {        
        try {
            
            let fecha = null;
            let salon = null;
            let turno = null;
            let correoClienteFinal = null;
            let correosAdminFinal = [];

            if (Array.isArray(datosCorreo)) {
                
                const arrReservas = Array.isArray(datosCorreo[0]) ? datosCorreo[0] : [];
                const primera = arrReservas[0] || {};
                fecha = primera.fecha ?? primera.fecha_reserva ?? null;
                salon = primera.salon ?? primera.titulo ?? null;
                turno = primera.turno ?? String(primera.turno_id ?? '');
                const adminsArr = Array.isArray(datosCorreo[1]) ? datosCorreo[1] : [];
                correosAdminFinal = adminsArr.map(a => a?.correoAdmin).filter(Boolean);
                
                correoClienteFinal = datosCorreo[2]?.correoCliente || null;
            } else {
                
                fecha = datosCorreo?.fecha ?? datosCorreo?.fecha_reserva ?? null;
                salon = datosCorreo?.salon ?? datosCorreo?.titulo ?? null;
                turno = datosCorreo?.turno ?? String(datosCorreo?.turno_id ?? '');
                correoClienteFinal = datosCorreo?.correoCliente || datosCorreo?.correoElectronico || datosCorreo?.email || datosCorreo?.nombre_usuario || null;
                correosAdminFinal = Array.isArray(datosCorreo?.correosAdmin) && datosCorreo.correosAdmin.length > 0
                    ? datosCorreo.correosAdmin
                    : (process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(s => s.trim()).filter(Boolean) : []);
            }

            
            if (!fecha || !salon || !turno) {
                throw new Error('Faltan datos de la reserva');
            }

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');
            
           
            const plantilla = fs.readFileSync(plantillaPath, 'utf-8');
            const template = handlebars.compile(plantilla);

            
            const datos = {
                fecha: fecha,
                salon: salon,
                turno: turno,
                fechaFormateada: new Date(fecha).toLocaleDateString('es-AR')
            };

            const correoHtml = template(datos);
            
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.CORREO,
                    pass: process.env.CLAVE
                }
            });

            
            try {
                const ok = await transporter.verify();
                console.log('[MAIL] Transport verify:', ok);
            } catch (verErr) {
                console.error('[MAIL] Transport verify FAILED:', verErr?.message);
            }

            
            const enviarEmail = async (destinatario, asunto) => {
                const mailOptions = {
                    from: process.env.CORREO,
                    to: destinatario,
                    subject: asunto,
                    html: correoHtml
                };
                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log(`[MAIL] Enviado a ${destinatario}:`, info?.messageId || info);
                    return info;
                } catch (sendErr) {
                    console.error(`[MAIL] Error enviando a ${destinatario}:`, sendErr?.message);
                    throw sendErr;
                }
            };

           
            let resultados = {};
            if (correoClienteFinal) {
                const infoCliente = await enviarEmail(correoClienteFinal, 'Confirmación de tu reserva');
                resultados.cliente = { ok: true, messageId: infoCliente.messageId };
            }
            if (correosAdminFinal && correosAdminFinal.length > 0) {
                const enviosAdmin = await Promise.all(
                    correosAdminFinal.map(admin => 
                        enviarEmail(admin, 'Nueva reserva registrada')
                            .then(info => ({ destinatario: admin, ok: true, messageId: info.messageId }))
                            .catch(error => ({ destinatario: admin, ok: false, error: error.message }))
                    )
                );
                resultados.administradores = enviosAdmin;
            }

            return {
                ok: true,
                mensaje: 'Notificaciones enviadas',
                ...resultados
            };

        } catch (error) {
            console.error("[MAIL] Error al enviar notificaciones:", error?.message);
            if (error?.stack) {
                console.error(error.stack);
            }
            throw new Error(`Error al enviar notificaciones: ${error.message}`);
        }
    }

    
    enviarMensaje = async (datos) => {} 
    enviarWhatsapp = async (datos) => {} 
    enviarNotificacionPush = async (datos) => {}
}
