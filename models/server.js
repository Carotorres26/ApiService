import express, { json } from 'express'
import dbConnection from '../database/config.js'
import 'dotenv/config'
import routesService from '../routes/serviceRoute.js'


class Server{
    //el constructor instancia una clase
    //si es un metodo tiene parentesis y atributo no
    constructor(){
        this.app = express()
        this.listen()
        this.dbConnection()
        this.pathService = '/api/Service'//indica una ruta publica de una api 
        this.route()
    }

    async dbConnection(){//espera a que haya una respuesta
        await dbConnection()
    }

    route(){
        this.app.use(json())//Emplear json al req body
        this.app.use(this.pathService, routesService)
    }

    listen(){
        //variable de entorno o global, verifica si el servidor esta corriendo
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port:${process.env.PORT}`); 
        })
    }
}

export default Server //Export the class Server 