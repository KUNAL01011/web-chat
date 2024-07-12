import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectToMongoDB from './db/connectDB.js';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);
app.use("/api/users",userRouter);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,'frontend',"dist",'index.html'));
})


server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
})