import userModel from "../models/userModel.js";

export const registerController = async (req,res,next) => {
      
        const {name,email,password} = req.body
        //validate
        if(!name){
          // return res.status(400).send({success:false,message:'please provide name'})
          next("name is required");
         }
        if(!email){
           // return res.status(400).send({success:false,message:'please provide email'})
           next("email is required");
         
         }
         if(!password){
            //return res.status(400).send({success:false,message:'please provide password'})
            next("password is required and greater than 6 character");
         }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
         next("Email Already Register Please Login");
         // return res.status(200).send({
         //   success:false,
         //   message:'Email Already Register Please Login' 
         // })
        }
        const user = await userModel.create({name,email,password})
        //token 
        const token = user.createJWT()
         res.status(201).send({
           success:true,
           message:'User Created Succesfully',
           user:{
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            location:user.location,
           },
           token,
         });      
}

// login controller 
 export const loginController = async (req,res,next)=>{
    const {email,password} = req.body;
    //validation 
    if(!email || !password){
      next('Please Provide All Fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password");
    if(!user){
      next('Invalid UserName or password')
    }
    //compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      next('Invalid UserName or password')
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
      success:true,
      message:'Login Succesfully',
      user,
      token,
    });  
 }