
// user model create 

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    secondname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    confirmpassword: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

userSchema.pre('save',async function(){
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hasspass = await bcrypt.hash(user.password,salt);
        user.password = hasspass;
    } catch (error) {
        throw error;
    }
});
userSchema.pre('save',async function(){
    try {
        var user = this;
        const salt = await bcrypt.genSalt(10);
        const hasspass = await bcrypt.hash(user.confirmpassword,salt);
        user.confirmpassword = hasspass;
    } catch (error) {
        throw error;
    }
});
userSchema.method.comparePassword = async function(userPassword){
    try {
        
        const isMatch=  await bcrypt.compare(userPassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;