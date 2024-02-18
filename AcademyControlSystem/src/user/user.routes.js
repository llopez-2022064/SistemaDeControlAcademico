'use strict'

import {Router} from 'express'
import {register, login, courseAssignment, showCourses} from './user.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.post('/assignCourses/:id', courseAssignment)
api.get('/showCourses/:id', showCourses)

export default api