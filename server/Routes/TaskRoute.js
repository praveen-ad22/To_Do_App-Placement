const express=require('express')
const router=express.Router()
const { gettask, createtask,deleteTask,updateTask} =require('../controller/taskcontroller')

router.get('/',gettask)
router.post('/',createtask)
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)

module.exports = router