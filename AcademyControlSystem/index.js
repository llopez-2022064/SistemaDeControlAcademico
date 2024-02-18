import { initServer } from './configs/app.js';
import { connect } from './configs/mongo.js';
import userModel from './src/user/user.model.js';
import User from './src/user/user.model.js'

const usuarioModelo = {
    name: "Josué",
    lastName: "Noj",
    username: "jnoj",
    mail: "jnoj@kinal.edu.gt",
    password: "josueNoj123",
    role: "TEACHER_ROLE",
};

async function crearRegistroAutomatico() {
    try {
        let exists = await userModel.findOne({username: usuarioModelo.username})

        if(exists){
            throw new Error(`----------- Error ya existe el usuario ${usuarioModelo.name} ${usuarioModelo.lastName}, el cual es un profesor -----------`);
        }

        let  user = new User(usuarioModelo);
        await user.save();

        console.log(' ----------- Se ha creado un usuario con role: TEACHER_ROLE -----------');
    } catch (error) {
        console.error('Error al crear el registro:', error);
    }
}

initServer();

connect().then(() => {
    crearRegistroAutomatico();
});
