import passport from 'passport';

// Middleware de autorización por roles
// rolesPermitidos: array de numeros [1,2,3] => 1=admin, 2=empleado, 3=cliente
export const autorizarUsuarios = (rolesPermitidos = []) => {
  return [
    // Autenticación JWT con callback para devolver el motivo exacto del 401
    (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        try {
          if (err) return next(err);

          if (!user) {
            // info puede ser un string o un objeto con mensajes de passport-jwt
            const detalle = typeof info === 'string' ? info : (info?.message || info?.mensaje || null);
            return res.status(401).json({ estado: false, mensaje: 'Unauthorized', detalle });
          }

          req.user = user;
          return next();
        } catch (e) {
          return next(e);
        }
      })(req, res, next);
    },
    // Autorización por rol
    (req, res, next) => {
      try {
        const usuario = req.user;
        if (!usuario) {
          return res.status(401).json({ estado: false, mensaje: 'No autenticado' });
        }
        const rol = Number(usuario?.tipo_usuario ?? usuario?.rol);
        if (!rolesPermitidos.includes(rol)) {
          return res.status(401).json({ estado: false, mensaje: 'No autorizado' });
        }
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
};
