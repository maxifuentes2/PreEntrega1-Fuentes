import express from "express";
import mongoose from "mongoose";
import passport from "./config/passport.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());

app.use("/api/sessions", sessionRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado");
        app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
    })
    .catch(err => console.log(err));