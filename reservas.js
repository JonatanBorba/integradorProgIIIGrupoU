//Importo Express para crear el servidor    
import express from 'express';
 
//Importamos handlebars para crear plantillas de correo html
import handlebars from 'handlebars';
//Importamos nodemailer para enviar correos
import nodemailer from 'nodemailer';
import morgan from 'morgan';
import passport from 'passport';
import fs from 'fs';
import { configurarPassport} from './config/passport.js';
//Importo fileURLToPath para manejar la ruta en formato URL a mi Index.js
import { fileURLToPath } from 'url';
// Importo readFile para leer archivos de forma asíncrona
import { readFile } from 'fs/promises';
//Importo path que me permite manejar rutas de archivos y directorios en dstintos sistemas operativos
import path from 'path';
import {serviciosRouter} from './rutas/v1/servicios.rutas.js';
import {salonesRouter } from './rutas/v1/salones.rutas.js';
import {usuariosRouter } from './rutas/v1/usuarios.rutas.js';
import { turnosRouter} from './rutas/v1/turnos.rutas.js';
import { reservasRouter } from './rutas/v1/reservas.rutas.js';
import { authRouter } from './rutas/v1/auth.rutas.js';
import { comentariosRouter } from './rutas/v1/comentarios.rutas.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//import { reservasRouter } from './rutas/v1/reservas.rutas.js';


//Creo una instancia de Express
const app = express();


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Reservas',
      version: '1.0.0',
      description: 'Documentación de la API de Reservas',
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    servers: [{ url: `http://localhost:${process.env.PUERTO || 3000}` }],
  },
  apis: ['./rutas/**/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Todo lo que este en el body de la peticion lo voy a recibir en formato JSON
app.use(express.json());// Defino una ruta para el endpoint /estado


//Configuro passport

configurarPassport(passport);
app.use(passport.initialize());

//morgan
let log = fs.createWriteStream('./access.log', { flags: 'a' })
app.use(morgan('combined')) 
app.use(morgan('combined', { stream: log })) 



app.get('/estado', (req, res) => {
    res.json({'ok' : true });
});    


//Defino la ruta para comentarios
app.use("/api/v1/comentarios", comentariosRouter);

//Login
app.use("/api/v1/auth", authRouter); 

// Defino la ruta base para el router de servicios
app.use("/api/v1/servicios", serviciosRouter);

// Defino la ruta base para el router de salones
app.use("/api/v1/salones", salonesRouter);

// Defino la ruta base para el router de salones
app.use("/api/v1/usuarios", usuariosRouter);

//Defino la ruta para Reservas
app.use("/api/v1/reservas", reservasRouter);
//Defino la ruta base para el router de turnos


app.use("/api/v1/turnos", turnosRouter);
// Defino la ruta base para el router de reservas
//app.use("/api/v1/reservas", reservasRouter);

//Creo una Ruta para enviar las notificaciones al administrador y al usuario
app.post('/notificacion', async(req, res) => {
    console.log(req.body)
    if(!req.body.fecha || !req.body.salon || !req.body.turno || !req.body.correoDestino) {
        res.status(400).json({'ok' : false, 'mensaje': 'Faltan datos en el body'});
    }
    try {

//         const { fecha, salon, turno, correoDestino } = req.body;

//         const __filename = fileURLToPath(import.meta.url);
//         const __dirname = path.dirname(__filename);

//         const plantilla = path.join(__dirname, 'utiles','handlebars','plantilla.hbs');
        
//         console.log(plantilla);

//         const datos = await readFile(plantilla, 'utf-8');

//         const template = handlebars.compile(datos);

//         var html = template({fecha : fecha, salon : salon, turno : turno});
        
//        // console.log(html);

//        const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.USER,
//             pass: process.env.PASS,
//         }
//        });

//     const opciones = {
//         to: correoDestino,
//         subject: 'Notificación Reserva',
//         html: html

//     }    

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
