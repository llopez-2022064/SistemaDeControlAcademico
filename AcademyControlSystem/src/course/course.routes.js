'use strict'

import {Router} from 'express'
import {test, createCourse, updateCourse, deleteCourse, listCourse, searchCourse} from './course.controller.js'

const api = Router()

api.get('/test', test)
api.post('/createCourse', createCourse)
api.put('/updateCourse/:id', updateCourse)
api.delete('/deteleCourse/:id', deleteCourse)
api.get('/listCourses', listCourse)
api.post('/searchCourse', searchCourse)

export default api