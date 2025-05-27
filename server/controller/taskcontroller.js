const Task =require('../model/Task');

const gettask=async(req,res)=>{
    const {userId}=req;
    try {
        const data=await Task.find({userId});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        
        console.error(error);
    }
}

const createtask=async(req,res)=>{
    const {userId}=req;
    const {title,description,dueDate,status}=req.body;
    try {
        const newTask=new Task({
            userId,
            title,
            description,
            dueDate,
            status
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        
        console.error(error);
    }
}
const updateTask=async(req,res)=>{
    const {id}=req.params;
    const {title,description,dueDate,status}=req.body;
    try {
        const updatedTask=await Task.findByIdAndUpdate(id,{
            title,
            description,
            dueDate,
            status
        },{new:true});
        
        if(!updatedTask){
            res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task updated successfully"});
    }
    catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        
        console.error(error);
    }}

    const deleteTask=async(req,res)=>{
        const {id}=req.params;
        try {
            const deletedTask=await Task.findByIdAndDelete(id);
            if(!deletedTask){
                res.status(404).json({message:"Task not found"});
            }
            res.status(200).json({message:"Task deleted successfully"});
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"});
            
            console.error(error);
        }
    }
module.exports = {createtask,gettask,updateTask,deleteTask};    