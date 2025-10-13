import {check} from 'express-validator';
import express from 'express';
import SalonesControlador from '../../controlador/salones.controlador.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
const router = express.Router();

const salonesControlador = new SalonesControlador();

router.post('/', [check("titulo","El título es obligatorio").not().isEmpty(),
    check("titulo","El título debe ser una cadena de texto").isString(),
    check("direccion","La dirección es obligatoria").not().isEmpty(),
    check("direccion","La dirección debe ser una cadena de texto").isString(),
    check("importe","El importe es obligatorio").not().isEmpty(),
    check("importe","El importe debe ser un número").isNumeric(),
    validarCampos
], salonesControlador.postSalones);

router.get('/:id', salonesControlador.getObtenerSalonPorId);

router.get('/', salonesControlador.getSalones);

router.put('/:id', [check("titulo","El título es obligatorio").not().isEmpty(),
    check("titulo","El título debe ser una cadena de texto").isString(),
    check("direccion","La dirección es obligatoria").not().isEmpty(),
    check("direccion","La dirección debe ser una cadena de texto").isString(),
    check("importe","El importe es obligatorio").not().isEmpty(),
    check("importe","El importe debe ser un número").isNumeric(),
    validarCampos
],
salonesControlador.putSalonesPorId);

router.delete('/:id', salonesControlador.deleteSalonPorId);

export{router as salonesRouter};