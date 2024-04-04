const mongoose = require("mongoose")
const user = require("./user")
const {format, formatDate} = require("date-fns")
const product = require("./product")
const orderSchema = new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    orderDate: {
        type: Date,
        default:formatDate(new Date(),"yyyy-MM-dd")
    },
    paid: {
        type: Boolean,
        default: false
    }, 
    price:{
        type: Number
    },
    productsList:{
        type:[{prod:{type:mongoose.Schema.Types.ObjectId,
                    ref:product},
                    quantity:Number}],
        default:[]
        
    },
    payment:{
        type:String,
        default:"מזומן",
        enum:["מזומן","צ'ק","נדרים פלוס"]
    },
    comments:{
        type:[String],
        default:[]
    },
    complete:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model('order', orderSchema)