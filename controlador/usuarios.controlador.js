import jwt from "jsonwebtoken";
import UsuariosServicios from "../servicios/usuarios.servicios.js";


export default class UsuariosControlador {
    constructor () { 
        this.usuariosServicio = new UsuariosServicios();
        
    }
    postUsuarios = async(req, res) => {
        const {nombre, apellido, nombre_usuario, contrasenia, tipo_usuario} = req.body;
        if(!nombre || !apellido || !nombre_usuario || !contrasenia || tipo_usuario == null){
            return res.status(400).json({mensaje: 'Faltan datos obligatorios'});
        }
        if(typeof nombre !== 'string' || typeof apellido !== 'string' || typeof nombre_usuario !== 'string'|| typeof contrasenia !== 'string'|| typeof tipo_usuario !== 'number'){
            return res.status(400).json({mensaje: 'El tipo de dato de algun campo es incorrecto'});
        }
        const nuevoUsuario = await this.usuariosServicio.agregarUsuario({nombre, apellido, nombre_usuario, contrasenia, tipo_usuario});
        res.status(201).json(nuevoUsuario);

    };
    // inicioSesion = async(req, res) => {
    //     try {
    //         const usuario = await this.usuariosServicio.inicioSesion(req.body.nombre_usuario, req.body.contrasenia);
    //         const token = jwt.sign(
    //             {
    //                 id: usuario.usuario_id,
    //                 email: usuario.nombre_usuario,
    //                 rol: usuario.tipo_usuario,
    //             },
    //             process.env.JWT_SECRET || process.env.SECRETA_JWT || "tu_clave_secreta_predeterminada",
    //             { expiresIn: "1h" }
    //         );
    //         return res.status(200).json({ estado: true, token });

    //     }catch (error) {
    //         return res.status(500).json({mensaje: 'Error interno del servidor.'});
    //     }
        
    // }
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
        const idModificar = req.params.id;
        const usuarioModificar = await this.usuariosServicio.modificarUsuariosPorId(idModificar, req.body);
        usuarioModificar ? res.status(200).json(usuarioModificar) : res.status(404).json({mensaje: 'Usuario no encontrado'});

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