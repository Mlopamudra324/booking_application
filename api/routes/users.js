import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user u are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user u are logged in and u can delete ur account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello Admin, u are logged in and u can delete all accounts")
// })

//CREATE
router.post("/", createUser)

//UPDATE
//to update use put method
router.put("/:id", verifyUser, updateUser)

//DELETE
router.delete("/:id", verifyUser, deleteUser)

//GET
//if i want a specific hotel then use this
router.get("/:id", verifyUser, getUser)

//GET ALL
//it gets all hotel
router.get("/", verifyAdmin, getAllUsers)

export default router