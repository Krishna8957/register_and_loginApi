const UserModel = require("../model/user.model");

const jwt  = require("jsonwebtoken");


class UserServices {
    static async registerUser(firstname, secondname, email, password, confirmpassword) {
        try {
            const createUser = new UserModel({ firstname, secondname, email, password, confirmpassword });
            return await createUser.save();
        } catch (err) {
            throw err;
        }
    }
    // static async checkUser(email){
    //     try {
    //         return await UserModel.findOne({email}).lean();

    //     } catch (error) {
    //         throw err;
    //     }
    // }

    // static async genrateToken(tokenData, secretkey,jwt_expire){
    //     return jwt.sign(tokenData,secretkey,{expiresIn: jwt_expire});
    // }
}

module.exports = UserServices;