const a=[{
    "userName":"sara",
    "password":"123",
    "name":"coen",
    "email":"AAA@gmail.com",
    "phone":"0583244968",
    "roles":"Mannager"
},
{
 
   "name":"project",
   "range":"5",
    "icon":"😂",
    "tags":["!","!"],
    "location":{
        "street":"nayman",
        "city":"jerusalem",
        "building":5
    },
    "status":"Assigned",
    "user":"65882d328a31e16a41db819f",
    "steps":[{
        "title":"cfbj",
        "comment":"dfghj"
    }]

}]
const Task=require("../models/tasksModel")
const createNewTask=async(req,res)=>{
    const {title,compleded,tags,taskDate,icon,range,status,location,user,steps,mark}=req.body
    if(!title) return res.status(400).send("title is require!")
    if(status)
    if(status!=="Assigned" &&status!=="In Process"&&status!=="Complete" &&status!=="Closed") return res.status(400).send("invalid!")
    const task=await Task.create({title,compleded,tags,taskDate,icon,range,status,location,user,steps,mark})
    res.json(task)
}

const getAllTasks= async(req,res)=>{
    const allTasks=await Task.find().lean()
    res.json(allTasks)
}

const getTasksById=async(req,res)=>{
    const {id}=req.params
    if(!id) return res.status(400).send("id is require!")

    const task=await Task.findById(id).lean()
    res.json(task)
}

const updateTask=async(req,res)=>{
    const {_id,title,compleded,tags,taskDate,icon,range,status,location,user,steps,mark}=req.body

    if(!title || !_id) return res.status(400).send("title | id is require!")
    if(status!=="Assigned" &&status!=="In Process"&&status!=="Complete" &&status!=="Closed") return res.status(400).send("invalid!")

    const task=await Task.findById(_id)

    if(!task) return res.status(400).send("not found")

    task.title=title
    task.compleded=compleded
    task.tags=tags
    task.taskDate=taskDate
    task.icon=icon
    task.status=status
    task.location=location
    task.user=user
    task.steps=steps
    task.mark=mark

    const update=await task.save()

    res.json(update)
}

const updateTaskComplete=async(req,res)=>{
    const {compleded}=req.body
    const {id}=req.params
    if( !id) return res.status(400).send("id is require!")
    const task=await Task.findById(id)
    if(!task) return res.status(400).send("not found")

    task.compleded=compleded

    const updateId=await task.save()
    res.json(updateId)
}

const deleteTask=async(req,res)=>{
    const {_id}=req.body
    const task=await Task.findById(_id)
    if(!task) return res.status(400).send("not found")

    const result=await Task.deleteOne()

    const deleted=`${_id} deleted`
    res.send(deleted)
}

const addStep=async(req,res)=>{
    const {_id,title,comments}=req.body
    if(!_id  || !title) {
        return res.status(400).send('!_id  || !title' )
    }
    const task=await Task.findById(_id).exec()
    if(!task) {
        return res.status(400).send('task not found' )

    }
    
    const newStep={title,comments}
    task.steps=[...task.steps,newStep]
    // task.steps=step
    const update = await task.save()
    return res.json(update)
}

module.exports={createNewTask,getAllTasks,getTasksById,updateTask,updateTaskComplete,deleteTask,addStep}