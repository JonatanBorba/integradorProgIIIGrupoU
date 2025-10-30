import TurnosServicios from "../servicios/turnos.servicios.js";


export default class TurnosControlador {
    constructor () { 
        this.turnosServicio = new TurnosServicios();
        
    }

   getTurnoPorId = async(req, res) => {
    try {
        const idConsultar = parseInt(req.params.id);
        
        // Verifica primero si el parseo fue exitoso
        if (isNaN(idConsultar)) {
            return res.status(400).json({ mensaje: 'ID de turno inválido. Debe ser un número entre 1 y 3.' });
        }
        
        // Luego verifica el rango
        if (idConsultar < 1 || idConsultar > 3) {
            return res.status(400).json({ mensaje: 'ID de turno inválido. Debe ser un número entre 1 y 3.' });
        }
        
        const turno = await this.turnosServicio.obtenerTurno(idConsultar);
        
        if (!turno) {
            return res.status(404).json({ mensaje: 'Turno no encontrado' });
        }
        
        res.status(200).json(turno);
    } catch (error) {
        console.error('Error al obtener el turno:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

    liastarTurnos = async(req, res) => {
        try {
            const turnos = await this.turnosServicio.listarTurnos();
            res.status(200).json(turnos);
        } catch (error) {
            console.error('Error al listar los turnos:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }   
    
    /*getTurnoPorId = async(req, res) => {
        const idConsultar = req.params.id;
        const turno = await this.turnosServicio.obtenerTurno(idConsultar);
        turno ? res.status(200).json(turno) : res.status(404).json({mensaje: 'Usuario no encontrado'});

    };*/
   
}
}


  

      