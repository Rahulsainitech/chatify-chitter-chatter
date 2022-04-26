const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        required:true,
        default:
            "https://cpng.pikpng.com/pngl/s/16-168770_user-iconset-no-profile-picture-icon-circle-clipart.png"
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(this.password,enteredPassword)
}

userSchema.pre('save',async function(next){
    if (!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt);

})
const User = mongoose.model("User",userSchema);
module.exports = User;