'use strict'

import { checkUpdate } from '../../../AdoptionSystem - copia/src/utils/validator.js'
import Course from './course.model.js'

export const test = (req, res) => {
    return res.send({ message: 'Function test ir running | COURSE' })
}

export const createCourse = async (req, res) => {
    try {
        let data = req.body
        let course = new Course(data)
        await course.save()
        return res.send({ message: 'Course saved successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving course' })
    }

}

export const updateCourse = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body

        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submit some data that cannot be updated or missing data' })

        let updateCourse = await Course.findOneAndUpdate(
            { _id: id }, 
            data, 
            { new: true }
        )

        if(!updateCourse) return res.status(401).send({message: 'Course not found and not updated'})
        return res.send({message: 'Updated course', updateCourse})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteCourse = async(req, res) =>{
    try {
        let {id} = req.params
        let deleteCourse = await Course.deleteOne({_id: id})

        if(deleteCourse.deletedCount == 0) return res.status(404).send({message: 'Course not found, not deleted'})
        return res.send({message: 'Deleted course successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting course'})
    }
}

export const listCourse = async(req, res) => {
    try {
        let courses = await Course.find()
        if(courses.length == 0) return res.status(404).send({message: 'Not found'})
        return res.send({courses})
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Error getting courses'})
    }
}

export const searchCourse = async(req, res) =>{
    try {
        let {search} = req.body
        let courses = await Course.find({
            name: search
        })

        if(courses.length == 0) return res.status(404).send({message: 'Course not found'})
        return res.send({message: 'Course found', courses})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error searching course'})
    }
}