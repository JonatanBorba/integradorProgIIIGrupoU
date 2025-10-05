import ServiciosDB from "../db/serviciosDB.js";

export default class ServiciosServicios {
    constructor () {
        this.serviciosDB = new ServiciosDB();

    }
    agregarServicio = async(servicio) => {
        try {
            return await this.serviciosDB.agregarServicio(servicio);

        }catch (error) {
            throw new Error('Error al agregar el servicio: ' + error.message);
        }
      

    };
    obtenerServicioPorId = async(id) => { 
        try {
            return await this.serviciosDB.obtenerPorId(id);
        }catch (error) {
            throw new Error('Error al obtener el servicio po ID' + error.message);
        }
    

    };
    obtenerServicios = async() => {
        try {
            return await this.serviciosDB.obtener();
        }catch (error) {
            throw new Error('Error al obtener los servicios: ' + error.message);
        }
    };
    modificarServicioPorId = async(id, body) => {
        try {
            return await this.serviciosDB.modificarPorId(id, body);
        }catch (error) {
            throw new Error('Error al modificar el servicio: ' + error.message);
        }
    };
    eliminarServicioPorId = async(id) => {
        try {
            return await this.serviciosDB.eliminarPorId(id);
        }catch (error) {
            throw new Error('Error al eliminar el servicio: ' + error.message);
        }
    };    
};          

