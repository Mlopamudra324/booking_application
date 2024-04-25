import express from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getAllHotel,
    getHotel,
    updateHotel,
    getHotelRooms
} from "../controllers/hotel.js";
import { verifyAdmin, } from "../utils/verifyToken.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createHotel)

//UPDATE
//to update use put method
router.put("/:id", verifyAdmin, updateHotel)

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

//GET
//if i want a specific hotel then use this
router.get("/find/:id", getHotel)

//GET ALL
//it gets all hotel
router.get("/", getAllHotel)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

//get hotel room
router.get("/room/:id", getHotelRooms)

export default router