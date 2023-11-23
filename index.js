
 // second step  
const app = require("./app");
const connectDB = require("./config/database");
connectDB();
const dotenv = require("dotenv");
dotenv.config();

const port =  process.env.PORT || 5000;
app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
console.log(`server is runing port http://localhost:${port}`);
})