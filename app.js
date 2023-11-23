// first step

const express = require("express");
const body_parese = require("body-parser");
const userRouter = require("./router/user_router")

const app = express();

app.use(body_parese.json());

app.use("/",userRouter);
module.exports = app;