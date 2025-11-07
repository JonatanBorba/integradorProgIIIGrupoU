import express from 'express';

import UsuariosControlador from '../../controlador/usuarios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const  app  =  express ( )

const usuariosControlador = new UsuariosControlador();

router.post('/registro',autorizarUsuarios([1,3]), usuariosControlador.postUsuarios);

router.get('/', autorizarUsuarios([1,2,3]), usuariosControlador.getUsuarios);

router.put('/:id', autorizarUsuarios([1,3]), usuariosControlador.putUsuariosPorId);

router.delete('/:id', autorizarUsuarios([1]), usuariosControlador.deleteUsuarioPorId);

export{router as usuariosRouter};