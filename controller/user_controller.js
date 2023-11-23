const userModel = require("../model/user.model");
const UserServices = require("../services/user_services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
exports.register = async (req, res, next) => {
    try {
        const { firstname, secondname, email, password, confirmpassword } = req.body;
        const successRes = await UserServices.registerUser(
            firstname,
            secondname,
            email,
            password,
            confirmpassword,
        );
        res.json({ status: true, success: "User Register Successfully" });

    } catch (error) {
        throw error;
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password } = req.body
       if(email && password){
        const user = await userModel.findOne({email:email});
        if(user != null){
           const isMatch = await bcrypt.compare(password, user.password);
           if(user.email === email && isMatch){
            // Generate Token
            const token = await jwt.sign({userID : user._id},
                process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
              res.status(200).json({ status:true,"message":"Login Successfully","token":token})
           }else{
            res.send({"status":"failed","message":"Email or Password dosn't Match"})
           }
        }else{
            res.send({"status":"failed","message":"User not Registered"})
        }
       }else{
        res.send({"status":"failed","message":"All field required"})
       }
       
    } catch (error) {
        console.log(error);
        res.send({"status": "failed", "message": "Unable to Login"})
    }
}





// exports.login = async (req, res, next) => {
//     try {
//         const { email, password, } = req.body;
//         const user = await UserServices.checkUser(email);
//         if (!user) {
//             throw new Error('User dont exist');
//         }
//         const isMatch = await user.comparePassword(password)
            
//         if (isMatch === false) {
//             throw new Error('Password invalid');
//         }

//         let tokenData = { _id: user._id, email: user.email };
//         const token = await UserServices.genrateToken(tokenData, "secretkey", "1h");
//         res.status(200).json({ status: true, token: token })
//     } catch (error) {
//         throw error;
//     }
// }