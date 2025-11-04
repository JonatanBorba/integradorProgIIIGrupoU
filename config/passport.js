// config/passport.js
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import UsuariosServicios from "../servicios/usuarios.servicios.js";

// Cargar variables de entorno al cargar este módulo
dotenv.config();

const usuariosServicio = new UsuariosServicios();

// Estrategia Local para login con usuario/contraseña
const estrategiaLocal = new LocalStrategy(
  {
    usernameField: "nombre_usuario",
    passwordField: "contrasenia",
  },
  async (nombre_usuario, contrasenia, done) => {
    try {
      const usuario = await usuariosServicio.inicioSesion(
        nombre_usuario,
        contrasenia
      );
      return done(null, usuario, { mensaje: "Inicio de sesión exitoso" });
    } catch (error) {
      return done(null, false, { mensaje: error.message });
    }
  }
);

// Estrategia JWT para validar tokens
const estrategiaJWT = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || process.env.SECRETA_JWT || "miSecretoParaProgIII",
  },
  async (jwt_payload, done) => {
    try {
      const usuario = await usuariosServicio.obtenerUsuarioPorId(
        jwt_payload.id
      );
      if (!usuario) {
        return done(null, false, { mensaje: "Usuario no encontrado" });
      }
      return done(null, usuario);
    } catch (error) {
      return done(error, false);
    }
  }
);

export const configurarPassport = (passport) => {
  passport.use("local", estrategiaLocal);
  passport.use("jwt", estrategiaJWT);
};