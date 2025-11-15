import SalonesServicios from "../servicios/salones.servicios.js";
import apicache from 'apicache';


export default class SalonesControlador {
    constructor () { 
        this.salonesServicio = new SalonesServicios();
        
    }
    postSalones = async(req, res) => {
        const {titulo,direccion,capacidad,importe} = req.body;
        const nuevoSalon = await this.salonesServicio.agregarSalon({titulo,direccion,capacidad,importe});
        apicache.clear('/api/v1/salones'); // limpiar cache al crear un nuevo salon
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
       if (salonesModificar) {apicache.clear('/api/v1/salones'); }  // limpiar cache al modificar un salon
        salonesModificar
        ?res.status(200).json(salonesModificar)
        : res.status(404).json({mensaje: 'Salón no encontrado'});

    };
    deleteSalonPorId = async(req, res) => {
        const eliminar = await this.salonesServicio.eliminarPorId(req.params.id);
        if (eliminar) {
            apicache.clear('/api/v1/salones'); // limpiar cache al eliminar un salon
            res.status(200).json({mensaje: 'Salón eliminado'});
        } else {
            res.status(404).json({mensaje: 'Salón no encontrado'});
        }
    };    
}
