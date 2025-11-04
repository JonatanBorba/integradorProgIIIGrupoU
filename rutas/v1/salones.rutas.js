import {check} from 'express-validator';
import express from 'express';
import SalonesControlador from '../../controlador/salones.controlador.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import apicache from 'apicache';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';
const router = express.Router();

const salonesControlador = new SalonesControlador();
let cache = apicache.middleware

router.post('/', autorizarUsuarios([1,2]), [check("titulo","El título es obligatorio").not().isEmpty(),
    check("titulo","El título debe ser una cadena de texto").isString(),
    check("direccion","La dirección es obligatoria").not().isEmpty(),
    check("direccion","La dirección debe ser una cadena de texto").isString(),
    check("importe","El importe es obligatorio").not().isEmpty(),
    check("importe","El importe debe ser un número").isNumeric(),
    validarCampos
], salonesControlador.postSalones);

router.get('/:id', autorizarUsuarios([1,2,3]), salonesControlador.getObtenerSalonPorId);

router.get('/', autorizarUsuarios([1,2,3]), cache('5 minutes'), salonesControlador.getSalones);

router.put('/:id', autorizarUsuarios([1,2]), [check("titulo","El título es obligatorio").not().isEmpty(),
    check("titulo","El título debe ser una cadena de texto").isString(),
    check("direccion","La dirección es obligatoria").not().isEmpty(),
    check("direccion","La dirección debe ser una cadena de texto").isString(),
    check("importe","El importe es obligatorio").not().isEmpty(),
    check("importe","El importe debe ser un número").isNumeric(),
    validarCampos
],
salonesControlador.putSalonesPorId);

router.delete('/:id', autorizarUsuarios([1,2]), salonesControlador.deleteSalonPorId);

export{router as salonesRouter};