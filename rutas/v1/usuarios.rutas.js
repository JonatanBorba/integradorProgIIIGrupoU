import express from 'express';
import {check, param} from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';
import UsuariosControlador from '../../controlador/usuarios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const  app  =  express ( )

const usuariosControlador = new UsuariosControlador();

router.post(
  '/registro',
  autorizarUsuarios([1,3]),
  [
    check('nombre', 'El nombre es obligatorio').trim().notEmpty().isString(),
    check('apellido', 'El apellido es obligatorio').trim().notEmpty().isString(),
    check('nombre_usuario', 'El nombre de usuario es obligatorio').trim().notEmpty().isString(),
    check('contrasenia', 'La contraseña es obligatoria').trim().notEmpty().isString(),
    check('tipo_usuario', 'El tipo de usuario es obligatorio y debe ser numérico').notEmpty().isInt({ min: 1 }),
    validarCampos
  ],
  usuariosControlador.postUsuarios
);

router.get('/', autorizarUsuarios([1,2,3]), usuariosControlador.getUsuarios);

router.get(
  '/:id',
  autorizarUsuarios([1,2,3]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    validarCampos
  ],
  usuariosControlador.getUsuariosPorId
);

router.put(
  '/:id',
  autorizarUsuarios([1,3]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    check('nombre', 'El nombre es obligatorio').optional().trim().notEmpty().isString(),
    check('apellido', 'El apellido es obligatorio').optional().trim().notEmpty().isString(),
    check('nombre_usuario', 'El nombre de usuario es obligatorio').optional().trim().notEmpty().isString(),
    check('contrasenia', 'La contraseña es obligatoria').optional().trim().notEmpty().isString(),
    check('tipo_usuario', 'El tipo de usuario debe ser numérico').optional().isInt({ min: 1 }),
    validarCampos
  ],
  usuariosControlador.putUsuariosPorId
);

router.delete(
  '/:id',
  autorizarUsuarios([1]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    validarCampos
  ],
  usuariosControlador.deleteUsuarioPorId
);

export{router as usuariosRouter};