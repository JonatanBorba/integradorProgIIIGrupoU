import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesServicio {

    enviarCorreo = async (datosCorreo) => {        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const plantillaPath = path.join(__dirname, '../utiles/handlebars/plantilla.hbs');
        const plantilla = fs.readFileSync(plantillaPath, 'utf-8');

        const template = handlebars.compile(plantilla);
        const datos = {
            fecha: datosCorreo.fecha,  
            salon: datosCorreo.salon,
            turno: datosCorreo.turno,
            correoElectronico: datosCorreo.correoElectronico || datosCorreo.correoDestino || "jonatanborba1987@gmail.com"
        };
        const correoHtml = template(datos);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        // Validar si se define correctamente un destinatario
        const destinatario = datosCorreo.correoElectronico || datosCorreo.correoDestino || "jonatanborba1987@gmail.com";

        if (!destinatario) {
            throw new Error('No se definió un destinatario de correo (correoElectronico o correoDestino).');
        }

        const mailOptions = {
            from: process.env.USER,
            to: destinatario,
            subject: "Notificación Reserva",
            html: correoHtml
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            
            // Retorna la información del envío
            return { success: true, message: 'Correo enviado.', info: info };

        } catch (error) {
            console.error("Error al enviar el correo:", error.message);
            
            // Error al enviar el correo
            throw new Error(`Fallo al enviar el correo: ${error.message}`);
        }
    }

    // OTROS TIPOS DE NOTIFICACION
    enviarMensaje = async (datos) => {} 
    
    enviarWhatsapp = async (datos) => {} 

    enviarNotificacionPush = async (datos) => {} 

}