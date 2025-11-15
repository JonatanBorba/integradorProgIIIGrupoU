import { conexion } from "./conexion.js";

export default class ReservasServicios {
    
    crear = async(reserva_id, servicios) => {

        try{
            await conexion.beginTransaction();

            for (const servicio of servicios){
                const sql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) 
                    VALUES (?,?,?);`;
                conexion.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe ]);
            }

            await conexion.commit();

            return true;
        }catch(error){
            await conexion.rollback();
            console.log(`error ${error}`);
            return false;
        }
    }

    reemplazar = async(reserva_id, servicios) => {
        try{
            await conexion.beginTransaction();

            const deleteSql = `DELETE FROM reservas_servicios WHERE reserva_id = ?`;
            await conexion.execute(deleteSql, [reserva_id]);

            for (const servicio of servicios){
                const insertSql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) 
                    VALUES (?,?,?);`;
                await conexion.execute(insertSql, [reserva_id, servicio.servicio_id, servicio.importe]);
            }

            await conexion.commit();
            return true;
        }catch(error){
            await conexion.rollback();
            console.log(`error ${error}`);
            return false;
        }
    }
}