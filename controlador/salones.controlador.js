import SalonesServicios from "../servicios/salones.servicios.js";


export default class SalonesControlador {
    constructor () { 
        this.salonesServicio = new SalonesServicios();
        
    }
    postSalones = async(req, res) => {
        const {titulo,direccion,capacidad,importe} = req.body;
        if(!titulo || !direccion || !capacidad || !importe ){
            return res.status(400).json({mensaje: 'Faltan datos obligatorios'});
        }
        if(typeof titulo !== 'string' || typeof direccion !== 'string' || typeof capacidad !== 'number' || typeof importe !== 'number' ){
            return res.status(400).json({mensaje: 'El tipo de dato de algun campo es incorrecto'});
        }
        const nuevoSalon = await this.salonesServicio.agregarSalon({titulo,direccion,capacidad,importe});
        res.status(201).json(nuevoSalon);

    };
    getObtenerSalonPorId = async(req, res) => {
        const idConsultar = req.params.id;
        const salones = await this.salonesServicio.obtenerSalonPorId(idConsultar);
        salones ? res.status(200).json(salones) : res.status(404).json({mensaje: 'Salón no encontrado'});


    };
    getSalones = async(req, res) => { 
        const salones = await this.salonesServicio.obtener();
        salones ? res.status(200).json(salones) : res.status(404).json({mensaje: 'No hay salones para mostrar'});

    };
    putSalonesPorId = async(req, res) => {    
        const idModificar = req.params.id;
        const salonesModificar = await this.salonesServicio.modificarPorId(idModificar, req.body);
       salonesModificar ? res.status(200).json(salonesModificar) : res.status(404).json({mensaje: 'Salón no encontrado'});

    };
    deleteSalonPorId = async(req, res) => {
        const eliminar = await this.salonesServicio.eliminarPorId(req.params.id);
        if (eliminar) {
            res.status(200).json({mensaje: 'Salón eliminado'});
        } else {
            res.status(404).json({mensaje: 'Salón no encontrado'});
        }
    };    
}