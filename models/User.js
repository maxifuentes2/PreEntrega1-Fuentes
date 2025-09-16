import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts" },
    role: { type: String, default: "user" }
});

// Método para encriptar password antes de guardar
userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Método para comparar passwords
userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("User", userSchema);
