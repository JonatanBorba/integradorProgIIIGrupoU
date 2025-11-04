import UsuariosDB from "../db/usuariosDB.js";
import bcrypt from 'bcryptjs';


export default class UsuariosServicios {
    constructor () {
        this.usuariosDB = new UsuariosDB();

    }
    agregarUsuario = async({nombre, apellido, nombre_usuario, contrasenia,tipo_usuario}) => {
        try {
            const usuarioExistente = await this.usuariosDB.ValidarPorEmail(nombre_usuario);
            if (usuarioExistente) {
                throw new Error('El nombre de usuario ya está en uso.');
            }
            const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
            return await this.usuariosDB.agregarUsuario({nombre, apellido, nombre_usuario, contrasenia:contraseniaEncriptada,tipo_usuario});

        }catch (error) {
            throw new Error('Error al agregar usuario: ' + error.message);
        }
      

    };
    obtenerUsuarioPorId = async(id) => { 
        try {
            return await this.usuariosDB.obtenerPorId(id);
        }catch (error) {
            throw new Error('Error al obtener el usuario po ID' + error.message);
        }
    

    };
    obtenerUsuario = async() => {
        try {
            return await this.usuariosDB.obtener();
        }catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    };
    modificarUsuariosPorId = async(id, body) => {
        try {
            const existeUsuario = await this.obtenerUsuarioPorId(id);
            if (!existeUsuario) {
                return null;
            };
            return await this.usuariosDB.modificarPorId(id, body);
        }catch (error) {
            throw new Error('Error al modificar el usuario: ' + error.message);
        }
    };
    eliminarUsuarioPorId = async(id) => {
        try {
            const existeUsuario = await this.obtenerUsuarioPorId(id);
            if (!existeUsuario) {
                return null;
            };
            return await this.usuariosDB.eliminarPorId(id);
        }catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    };    
    inicioSesion = async(nombre_usuario, contrasenia) => {
        try {
            const usuario =  await this.usuariosDB.ValidarPorEmail(nombre_usuario);
            if (!usuario) {
                throw new Error('nombre de Usuario no encontrado');
            }
            
            const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if (!contraseniaValida) {
                throw new Error('Contraseña incorrecta');
            }
            const { contrasenia: _omit, ...usuarioSinContrasenia } = usuario;
            return usuarioSinContrasenia;    

}catch(error){
    throw new Error('Error al iniciar sesión: ' + error.message);
}
}
};


