import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        // Store hash in your password DB.
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).send("user has been created")

    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if (!user) { return next(createError(404, "user not found")) }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or username"))
        }

        //JWT json web token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "sdfsdfs") //here sdfsdfs is the secret key and it is stored in env file as JWT
        //basically we have this information above and fo each request we send the jwt to verify our identity.

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ details: { ...otherDetails }, isAdmin, })

    } catch (err) {
        next(err)
    }
}