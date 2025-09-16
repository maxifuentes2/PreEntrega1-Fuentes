import express from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isValidPassword(password)) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

// Current - validar JWT
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user: req.user });
});

export default router;