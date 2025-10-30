import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generarToken = (id) => {
    return jwt.sign({usuario_id: id}, process.env.SECRETA_JWT, {expiresIn: '8h'});
}