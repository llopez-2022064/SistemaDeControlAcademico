'use strict'

import User from './user.model.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/generateToken.js'
import Course from '../course/course.model.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        //Encriptar contrasena
        data.password = await encrypt(data.password)
        data.role = 'STUDENT_ROLE'
        let user = new User(data)
        await user.save()
        return res.send({ message: 'User registered successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering user', error })
    }
}



export const login = async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await User.findOne({ username })

        if (user && await checkPassword(password, user.password)) {
            let loggedUserd = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUserd)
            return res.send(
                {
                    message: `Welcome ${loggedUserd.name}`,
                    loggedUserd,
                    token
                }
            )
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const courseAssignment = async (req, res) => {
    try {
        let { id } = req.params
        if (id) {
            let user = await User.findById({ _id: id })
            if (user) {
                if (user.courses.length < 3) {
                    let { firstCourse, secondCourse, thirdCourse } = req.body
                    if (firstCourse || secondCourse || thirdCourse) {
                        let aux = [firstCourse, secondCourse, thirdCourse]
                        let temp = []
                        for (let x = 0; x < aux.length; x++) {
                            if (aux[x].trim() !== '') {
                                temp.push(aux[x])
                            }
                        }
                        if (temp.length > 0) {
                            for (let x = 0; x < temp.length; x++) {
                                let logical = user.courses.includes(temp[x])
                                if (!logical) {
                                    if (user.courses.length < 3) {
                                        user.courses.push(temp[x])
                                        user.save()
                                    } else {
                                        return res.status(500).send({ message: 'User already has 3 courses' })
                                    }
                                }
                            }
                            return res.status(200).send({ message: 'The operation was a complete success.' })
                        } else {
                            return res.status(500).send({ message: 'No has ingresado ningun curso' })
                        }
                    } else {
                        return res.status(500).send({ message: 'No has ingresado ningun curso' })
                    }
                } else {
                    return res.status(500).send({ message: 'User already has 3 courses' })
                }
            } else {
                return res.status(500).send({ message: 'User not found' })
            }
        } else {
            return res.status(500).send({ message: 'Id not found' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error when assigning courses' })
    }
}

export const showCourses = async (req, res) => {
    try {
        let { id } = req.params
        if (id) {
            let user = await User.findById({ _id: id })
            if (user) {
                if (user.courses.length > 0) {
                    return res.status(200).send({ Courses: user.courses })
                } else {
                    return res.status(500).send({ message: 'Does not have assigned courses' })
                }
            } else {
                return res.status(500).send({ message: 'User not found' })
            }
        } else {
            return res.status(500).send({ message: 'Id not found' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error displaying courses' })
    }
}