import jwt from "jsonwebtoken";
import passport from "passport";

export default class AuthController {
  login = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, usuario, info) => {
      try {
        if (err || !usuario) {
          return res.status(400).json({
            estado: false,
            mensaje: info?.mensaje || "Credenciales inválidas",
          });
        }

        // Generar token JWT
        const token = jwt.sign(
          {
            id: usuario.usuario_id,
            email: usuario.nombre_usuario,
            rol: usuario.tipo_usuario,
          },
          process.env.JWT_SECRET,
          { expiresIn: "4h" }
        );

        return res.json({
          estado: true,
          token: token,
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  };
}