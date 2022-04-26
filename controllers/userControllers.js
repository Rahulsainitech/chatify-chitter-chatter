const asyncHandler = require("express-async-handler")
const User = require("../models/userModal")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body
    console.log(name,email,password)
    if(!name|| !email || !password){
        res.status(400);
        throw new Error ("please fill all the fields")
    }
const userExist = await User.findOne({email});
if (userExist){
    res.status(400)
    throw new Error("User already exist")
}
const user = await User.create({
    name,email,password,pic
});
if (user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
    })
}else{
    res.status(400);
    throw new Error("failed to Create the User")
}
});

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    const user = await User.findOne({email});

    if (user && user.matchPassword(password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.json({message:"notfound"})
    }
})

//api/user
const allUsers= asyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ?{
        $or: [
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ],
    }:{};
    const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
    // 
    res.send(users)
})

module.exports = {registerUser,authUser,allUsers}