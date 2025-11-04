import express from 'express';
import AuthController from '../../controlador/auth.controlador.js';

import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', 
    [
        check('nombre_usuario', 'El correo electrónico es requerido!').not().isEmpty(),
        check('nombre_usuario', 'Revisar el formato del correo electrónico!').isEmail(),
        check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
        validarCampos
    ], 
    (req, res) => authController.login(req, res));

export {router as authRouter}; ;