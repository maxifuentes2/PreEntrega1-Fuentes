import dotenv from "dotenv";
dotenv.config(); // 🔹 cargar dotenv aquí también

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/User.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

if (!opts.secretOrKey) throw new Error("JWT_SECRET no está definido");

passport.use(
    "jwt",
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

export default passport;
