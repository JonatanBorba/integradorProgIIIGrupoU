 import {check} from 'express-validator';
 import express from 'express';
 import ReservasControlador from '../../controlador/reservas.controlador.js';
 import { validarCampos } from '../../middlewares/validarCampos.js';
 const router = express.Router();

 const reservasControlador = new ReservasControlador();
 router.post('/', 
    [
        check('fecha_reserva', 'La fecha es necesaria.').notEmpty(),
        check('salon_id', 'El salón es necesario.').notEmpty(),
        check('usuario_id', 'El usuario es necesario.').notEmpty(), 
        check('turno_id', 'El turno es necesario.').notEmpty(),  
        check('servicios', 'Faltan los servicios de la reserva.')
        .notEmpty()
        .isArray(),   // tiene que ser un array 1 o mas servicios asociados a la reserva
        check('servicios.*.importe')
        .isFloat() 
        .withMessage('El importe debe ser numérico.'),   
        validarCampos
    ],
    reservasControlador.crear);

export{router as reservasRouter};
// router.post('/', reservasControlador.postReservas);
// // router.get('/:id', salonesControlador.getObtenerSalonPorId);

// // router.get('/', salonesControlador.getSalones);

// // router.put('/:id', [check("titulo","El título es obligatorio").not().isEmpty(),
// //     check("titulo","El título debe ser una cadena de texto").isString(),
// //     check("direccion","La dirección es obligatoria").not().isEmpty(),
// //     check("direccion","La dirección debe ser una cadena de texto").isString(),
// //     check("importe","El importe es obligatorio").not().isEmpty(),
// //     check("importe","El importe debe ser un número").isNumeric(),
// //     validarCampos
// // ],
// // salonesControlador.putSalonesPorId);

// // router.delete('/:id', salonesControlador.deleteSalonPorId);

// export{router as reservasRouter};