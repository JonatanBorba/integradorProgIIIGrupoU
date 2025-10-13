import SalonesDB from "../db/salonesDB.js";

export default class SalonesServicios {
    constructor () {
        this.salonesDB = new SalonesDB();

    }
    agregarSalon = async(salones) => {
        try {
            return await this.salonesDB.agregarSalon(salones);

        }catch (error) {
            throw new Error('Error al agregar el salón: ' + error.message);
        }
      

    };
    obtenerSalonPorId = async(id) => { 
        try {
            return await this.salonesDB.obtenerPorId(id);
        }catch (error) {
            throw new Error('Error al obtener el salon por ID' + error.message);
        }
    

    };
    obtener = async() => {
        try {
            return await this.salonesDB.obtener();
        }catch (error) {
            throw new Error('Error al obtener los salones: ' + error.message);
        }
    };
    modificarPorId = async(id, body) => {
        try {
            const existeSalon = await this.obtenerSalonPorId(id);
            if (!existeSalon) { 
                return null;
            }
            return await this.salonesDB.modificarPorId(id, body);
        }catch (error) {
            throw new Error('Error al modificar el salon: ' + error.message);
        }
    };
    eliminarPorId = async(id) => {
        try {
            const existeSalon = await this.obtenerSalonPorId(id);
            if (!existeSalon) { 
                return null;
            }
            return await this.salonesDB.eliminarPorId(id);
        }catch (error) {
            throw new Error('Error al eliminar el salón: ' + error.message);
        }
    };    
};          

