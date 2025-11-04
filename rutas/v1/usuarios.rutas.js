import express from 'express';
import UsuariosControlador from '../../controlador/usuarios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const usuariosControlador = new UsuariosControlador();

router.post('/registro', autorizarUsuarios([1]), usuariosControlador.postUsuarios);

// Inicio de sesión legado (público)
// router.post('/inicioSesion', usuariosControlador.inicioSesion);

router.get('/:id', autorizarUsuarios([1,2]), usuariosControlador.getUsuariosPorId);

router.get('/', autorizarUsuarios([1,2]), usuariosControlador.getUsuarios);

router.put('/:id', autorizarUsuarios([1]), usuariosControlador.putUsuariosPorId);

router.delete('/:id', autorizarUsuarios([1]), usuariosControlador.deleteUsuarioPorId);

export{router as usuariosRouter};