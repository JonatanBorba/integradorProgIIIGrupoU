import ServiciosServicios from "../servicios/servicios.servicios.js";


export default class ServiciosControlador {
    constructor () { 
        this.serviciosServicio = new ServiciosServicios();
        
    }
    postServicios = async(req, res) => {
        const {descripcion,importe} = req.body;
        if(!descripcion || !importe){
            return res.status(400).json({mensaje: 'Faltan datos obligatorios'});
        }
        if(typeof descripcion !== 'string' || typeof importe !== 'number'){
            return res.status(400).json({mensaje: 'El tipo de dato de algun campo es incorrecto'});
        }
        const nuevoServicio = await this.serviciosServicio.agregarServicio({descripcion,importe});
        res.status(201).json(nuevoServicio);

    };
    getServiciosPorId = async(req, res) => {
        const idConsultar = req.params.id;
        const servicio = await this.serviciosServicio.obtenerServicioPorId(idConsultar);
        servicio ? res.status(200).json(servicio) : res.status(404).json({mensaje: 'Servicio no encontrado'});


    };
    getServicios = async(req, res) => { 
        const servicios = await this.serviciosServicio.obtenerServicios();
        servicios ? res.status(200).json(servicios) : res.status(404).json({mensaje: 'No hay servicios para mostrar'});

    };
    putServiciosPorId = async(req, res) => {    
        const idModificar = req.params.id;
        const sevicioModificar = await this.serviciosServicio.modificarServicioPorId(idModificar, req.body);
        sevicioModificar ? res.status(200).json(sevicioModificar) : res.status(404).json({mensaje: 'Servicio no encontrado'});

    };
    deleteServiciosPorId = async(req, res) => {
        const eliminar = await this.serviciosServicio.eliminarServicioPorId(req.params.id);
        if (eliminar) {
            res.status(200).json({mensaje: 'Servicio eliminado'});
        } else {
            res.status(404).json({mensaje: 'Servicio no encontrado'});
        }
    };    
}