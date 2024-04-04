const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },  
    email:{
        type:String,
        lowercase:true,
    },  
    phone:{
        type:String,
    },
    role:{
        type:String,
        enum:['משתמש','מנהל'],
        default:'משתמש'
    },
    
},
{
    timestamps: true
})
module.exports=mongoose.model('user',userSchema)