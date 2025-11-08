import passport from 'passport';


export const autorizarUsuarios = (rolesPermitidos = []) => {
  return [
   
    (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        try {
          if (err) return next(err);

          if (!user) {
            
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
