
const mongoose=require('mongoose')
const Schema= mongoose.Schema



const UserSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'image.jpg'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user','author'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: 'false'
    },
    
        isDeleted: {
            type: Boolean,
            default: false
        }
    
},{
    timestamps: true,
    versionKey: false
})


const userModel=mongoose.model('user',UserSchema)

module.exports=userModel