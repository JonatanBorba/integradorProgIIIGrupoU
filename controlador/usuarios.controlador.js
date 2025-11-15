import jwt from "jsonwebtoken";
import UsuariosServicios from "../servicios/usuarios.servicios.js";
 


export default class UsuariosControlador {
    constructor () { 
        this.usuariosServicio = new UsuariosServicios();
        
    }
    postUsuarios = async(req, res) => {
        const {nombre, apellido, nombre_usuario, contrasenia, tipo_usuario} = req.body;
        const nuevoUsuario = await this.usuariosServicio.agregarUsuario({nombre, apellido, nombre_usuario, contrasenia, tipo_usuario});
        res.status(201).json(nuevoUsuario);

    };
   
    getUsuariosPorId = async(req, res) => {
        const idConsultar = req.params.id;
        const usuario = await this.usuariosServicio.obtenerUsuarioPorId(idConsultar);
        usuario ? res.status(200).json(usuario) : res.status(404).json({mensaje: 'Usuario no encontrado'});


    };
    getUsuarios = async(req, res) => { 
        const usuarios = await this.usuariosServicio.obtenerUsuario();
        usuarios ? res.status(200).json(usuarios) : res.status(404).json({mensaje: 'No hay usuarios para mostrar'});

    };
    putUsuariosPorId = async(req, res) => {    
        try {
            const idModificar = req.params.id;
            const usuarioModificar = await this.usuariosServicio.modificarUsuariosPorId(idModificar, req.body);
            if (!usuarioModificar) {
                return res.status(404).json({mensaje: 'Usuario no encontrado'});
            }
            return res.status(200).json(usuarioModificar);
        } catch (error) {
            if (error.message.includes('El nombre de usuario ya está en uso')) {
                return res.status(400).json({mensaje: error.message});
            }
            console.error('Error en PUT /usuarios/:id', error);
            return res.status(500).json({mensaje: 'Error interno del servidor'});
        }

    };
    deleteUsuarioPorId = async(req, res) => {
        const eliminar = await this.usuariosServicio.eliminarUsuarioPorId(req.params.id);
        if (eliminar) {
            res.status(200).json({mensaje: 'Usuario eliminado'});
        } else {
            res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
    };    
}