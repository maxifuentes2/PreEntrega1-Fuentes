import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        const isValid = user.isValidPassword(password);
        if (!isValid) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error en login", error: err });
    }
};