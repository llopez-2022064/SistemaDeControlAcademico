import {Schema, model} from 'mongoose'

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },
    password:{
        type: String,
        minLength: 8,
        required: true
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['STUDENT_ROLE', 'TEACHER_ROLE'],
        required: true
    },
    courses: [{
        type: String
    }]
})

export default model('user', userSchema)