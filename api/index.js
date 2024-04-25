import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

//here i am using npm so i need to export my librarie sby default.
// const express = require("express")

//if we are not doing the above then add the "type" : "module" in the package.json

const app = express();

//to use dotenv we do this configuration as below
dotenv.config()

// To handle initial connection errors, you should use .catch() or try/catch with async/await.
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB.")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB is disconnected.")
})

//middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

//to the application, listen any port number
app.listen(8800, () => {
    connect()
    console.log("connected to backend!")
})
