import express from "express";
import { verifyAdmin, } from "../utils/verifyToken.js";
import {
    updateRoom,
    updateRoomAvailability,
    createRoom,
    deleteRoom,
    getRoom,
    getAllRoom
} from "../controllers/room.js";


const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDATE
//to update use put method
router.put("/:id", verifyAdmin, updateRoom)
router.put("/available/:id", updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//GET
//if i want a specific hotel then use this
router.get("/:id", getRoom)

//GET ALL
//it gets all hotel
router.get("/", getAllRoom)

export default router