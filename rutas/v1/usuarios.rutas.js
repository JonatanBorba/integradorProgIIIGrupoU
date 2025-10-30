import express from 'express';
import UsuariosControlador from '../../controlador/usuarios.controlador.js';

const router = express.Router();

const usuariosControlador = new UsuariosControlador();

router.post('/registro', usuariosControlador.postUsuarios);

router.post('/inicioSesion', usuariosControlador.inicioSesion);

router.get('/:id', usuariosControlador.getUsuariosPorId);

router.get('/', usuariosControlador.getUsuarios);

router.put('/:id', usuariosControlador.putUsuariosPorId);

router.delete('/:id', usuariosControlador.deleteUsuarioPorId);

export{router as usuariosRouter};