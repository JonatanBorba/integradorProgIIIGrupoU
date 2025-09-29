//Importo Express para crear el servidor    
import express from 'express';
 
//Importamos handlebars para crear plantillas de correo html
import handlebars from 'handlebars';
//Importamos nodemailer para enviar correos
import nodemailer from 'nodemailer';
//Importo fileURLToPath para manejar la ruta en formato URL a mi Index.js
import { fileURLToPath } from 'url';
// Importo readFile para leer archivos de forma asíncrona
import { readFile } from 'fs/promises';
//Importo path que me permite manejar rutas de archivos y directorios en dstintos sistemas operativos
import path from 'path';
import { info } from 'console';

//Creo una instancia de Express
const app = express();
//Todo lo que este en el body de la peticion lo voy a recibir en formato JSON
app.use(express.json());// Defino una ruta para el endpoint /estado

app.get('/estado', (req, res) => {
    res.json({'ok' : true });
});    

app.get
//Creo una Ruta para enviar las notificaciones al administrador y al usuario
app.post('/notificacion', async(req, res) => {
    console.log(req.body)
    if(!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino) {
        res.status(400).json({'ok' : false, 'mensaje': 'Faltan datos en el body'});
    }
    try {

        const { fecha, salon, turno, correoDestino } = req.body;

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const plantilla = path.join(__dirname, 'utiles','handlebars','plantilla.hbs');
        
        console.log(plantilla);

        const datos = await readFile(plantilla, 'utf-8');

        const template = handlebars.compile(datos);

        var html = template({fecha : fecha, salon : salon, turno : turno});
        
       // console.log(html);

       const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
       });

    const opciones = {
        to: correoDestino,
        subject: 'Notificación Reserva',
        html: html

    }    

    transporter.sendMail(opciones, (error, info) => {
        if(error) {
            console.log(error);
            res.json({'ok':false, 'mensaje': 'Error al enviar el correo'});
        }
        console.log(info);
        res.json({'ok':true, 'mensaje': 'Correo enviado'});
    }); 
    }catch(error) {
        console.log(error);
    }    
    res.json({'ok' : true});
});

// Pongo a escuchar el servidor en el puerto 3000
process.loadEnvFile();
app.listen(process.env.PUERTO, () => {
    console.log(`El servidor esta corriendo en el puerto ${process.env.PUERTO} `);

});
