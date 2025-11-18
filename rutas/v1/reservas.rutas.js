import {check, param} from 'express-validator';
 import express from 'express';
 import ReservasControlador from '../../controlador/reservas.controlador.js';
 import { validarCampos } from '../../middlewares/validarCampos.js';
 import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';
 const router = express.Router();

 const reservasControlador = new ReservasControlador();
 
 /**
* @swagger
 * components:
 *   schemas:
 *     ReservaInput:
 *       type: object
 *       required:
 *         - fecha_reserva
 *         - salon_id
 *         - usuario_id
 *         - turno_id
 *         - tematica
 *         - importe_salon
 *         - importe_total
 *         - servicios
 *       properties:
 *         fecha_reserva:
 *           type: string
 *           format: date
 *           description: Fecha de la reserva (YYYY-MM-DD)
 *         salon_id:
 *           type: integer
 *           description: ID del salón reservado
 *         usuario_id:
 *           type: integer
 *           description: ID del usuario que hace la reserva
 *         turno_id:
 *           type: integer
 *           description: ID del turno seleccionado
 *         foto_cumpleaniero:
 *           type: string
 *           nullable: true
 *           description: URL o base64 de la foto (opcional)
 *         tematica:
 *           type: string
 *           description: Temática del evento
 *         importe_salon:
 *           type: number
 *           description: Importe del salón
 *         importe_total:
 *           type: number
 *           description: Importe total incluyendo servicios
 *         servicios:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - servicio_id
 *               - importe
 *             properties:
 *               servicio_id:
 *                 type: integer
 *               importe:
 *                 type: number
 *
  * @swagger
  * tags:
  *   name: Reservas
  *   description: Endpoints para gestionar reservas
  */
 
 /**
  * @swagger
  * /api/v1/reservas:
  *   get:
  *     summary: Listado de reservas
  *     tags: [Reservas]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: Lista de reservas
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 estado:
  *                   type: boolean
  *                   example: true
  *                 datos:
  *                   type: array
  *                   items:
  *                     $ref: '#/components/schemas/Reserva' 
  *   post:
  *     summary: Crear una reserva
  *     tags: [Reservas]
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               fecha_reserva:
  *                 type: string
  *                 example: "2025-11-02"
  *               salon_id:
  *                 type: integer
  *                 example: 1
  *               usuario_id:
  *                 type: integer
  *                 example: 3
  *               turno_id:
  *                 type: integer
  *                 example: 2
  *               foto_cumpleaniero:
  *                 type: string
  *                 nullable: true
  *               tematica:
  *                 type: string
  *               importe_salon:
  *                 type: number
  *                 example: 150000
  *               importe_total:
  *                 type: number
  *                 example: 200000
  *               servicios:
  *                 type: array
  *                 items:
  *                   type: object
  *                   properties:
  *                     servicio_id:
  *                       type: integer
  *                     importe:
  *                       type: number
  *     responses:
  *       201:
  *         description: Reserva creada
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 estado:
  *                   type: boolean
  *                   example: true
  *                 mensaje:
  *                   type: string
  *                   example: "Reserva creada!"
  *                 salon:
  *                   type: object
  *                   properties:
  *                     reserva_id:
  *                       type: integer
  *                       example: 1
  *                     fecha_reserva:
  *                       type: string
  *                       example: "2025-11-02"
  *                     salon_id:
  *                       type: integer
  *                       example: 1
  *                     usuario_id:
  *                       type: integer
  *                       example: 3
  *                     turno_id:
  *                       type: integer
  *                       example: 2
  *                     tematica:
  *                       type: string
  *                       example: "Superhéroes"
  *                     importe_salon:
  *                       type: number
  *                       example: 150000
  */
 /**
  * @swagger
  * /api/v1/reservas/informe:
  *   get:
  *     summary: Informe de reservas
  *     tags: [Reservas]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: Informe generado
  */
 /**
  * @swagger
  * /api/v1/reservas/{reserva_id}:
  *   delete:
  *     summary: Elimina una reserva (borrado lógico)
  *     tags: [Reservas]
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: reserva_id
  *         required: true
  *         schema:
  *           type: integer
  *     responses:
  *       200:
  *         description: Reserva eliminada correctamente
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 estado:
  *                   type: boolean
  *                   example: true
  *                 mensaje:
  *                   type: string
  *                   example: "Reserva eliminada correctamente"
  *       403:
  *         description: No autorizado para eliminar esta reserva
  *       404:
  *         description: Reserva no encontrada
  *       500:
  *         description: Error del servidor al eliminar la reserva
  */
 // Informe: solo administrador (1)
 router.get('/informe', autorizarUsuarios([1]), reservasControlador.informe);
  // Listado general: admin (1), empleado (2), cliente (3)
 router.get('/', autorizarUsuarios([1,2,3]), reservasControlador.buscarTodos);
  // Detalle por id: admin (1), empleado (2), cliente (3)
 router.get('/:reserva_id', autorizarUsuarios([1,2,3]), reservasControlador.buscarPorId);
 router.post('/', autorizarUsuarios([1,3]), 
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

    /**
 * @swagger
 * /api/v1/reservas/{reserva_id}:
 *   put:
 *     summary: Modificar una reserva existente
 *     description: Actualiza los datos de una reserva y sus servicios asociados.
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         description: ID numérico de la reserva a modificar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fecha_reserva
 *               - salon_id
 *               - usuario_id
 *               - turno_id
 *               - importe_salon
 *               - importe_total
 *               - servicios
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-20"
 *               salon_id:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *               usuario_id:
 *                 type: integer
 *                 minimum: 1
 *                 example: 5
 *               turno_id:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *               importe_salon:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 15000.5
 *               importe_total:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 20000
 *               servicios:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - servicio_id
 *                     - importe
 *                   properties:
 *                     servicio_id:
 *                       type: integer
 *                       minimum: 1
 *                       example: 10
 *                     importe:
 *                       type: number
 *                       format: float
 *                       minimum: 0
 *                       example: 5000
 *     responses:
 *       200:
 *         description: Reserva modificada correctamente.
 *       400:
 *         description: Error de validación o datos inválidos.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: El usuario no tiene permisos para modificar reservas.
 *       404:
 *         description: Reserva no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:reserva_id',
  autorizarUsuarios([1,2,3]),
  [
    param('reserva_id', 'El ID de la reserva debe ser numérico.').isInt({ min: 1 }),
    check('fecha_reserva', 'La fecha es necesaria.').notEmpty(),
    check('salon_id', 'El salón es necesario y debe ser numérico.').isInt({ min: 1 }),
    check('usuario_id', 'El usuario es necesario y debe ser numérico.').isInt({ min: 1 }),
    check('turno_id', 'El turno es necesario y debe ser numérico.').isInt({ min: 1 }),
    check('importe_salon', 'El importe del salón es obligatorio y debe ser numérico.').isFloat({ gt: 0 }),
    check('importe_total', 'El importe total es obligatorio y debe ser numérico.').isFloat({ gt: 0 }),
    check('servicios', 'Debe indicar los servicios de la reserva.').isArray({ min: 1 }),
    check('servicios.*.servicio_id', 'Cada servicio debe incluir un ID numérico.').isInt({ min: 1 }),
    check('servicios.*.importe', 'Cada servicio debe incluir un importe numérico.').isFloat({ gt: 0 }),
    validarCampos
  ],
  reservasControlador.actualizarReserva
);

   router.put('/:reserva_id',
   autorizarUsuarios([1,2,3]),
   [
     param('reserva_id', 'El ID de la reserva debe ser numérico.').isInt({ min: 1 }),
     check('fecha_reserva', 'La fecha es necesaria.').notEmpty(),
     check('salon_id', 'El salón es necesario y debe ser numérico.').isInt({ min: 1 }),
     check('usuario_id', 'El usuario es necesario y debe ser numérico.').isInt({ min: 1 }),
     check('turno_id', 'El turno es necesario y debe ser numérico.').isInt({ min: 1 }),
     check('importe_salon', 'El importe del salón es obligatorio y debe ser numérico.').isFloat({ gt: 0 }),
     check('importe_total', 'El importe total es obligatorio y debe ser numérico.').isFloat({ gt: 0 }),
     check('servicios', 'Debe indicar los servicios de la reserva.').isArray({ min: 1 }),
     check('servicios.*.servicio_id', 'Cada servicio debe incluir un ID numérico.').isInt({ min: 1 }),
     check('servicios.*.importe', 'Cada servicio debe incluir un importe numérico.').isFloat({ gt: 0 }),
     validarCampos
   ],
   reservasControlador.actualizarReserva
);

/**
 * @swagger
 * /api/v1/reservas/{reserva_id}:
 *   delete:
 *     summary: Elimina una reserva (borrado lógico)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 mensaje:
 *                   type: string
 *                   example: "Reserva eliminada correctamente"
 *       403:
 *         description: No autorizado para eliminar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error del servidor al eliminar la reserva
 */
router.delete('/:reserva_id', autorizarUsuarios([1,3]), reservasControlador.deleteReservaPorId);    

export{router as reservasRouter};
