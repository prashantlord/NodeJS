import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            required: true,
            type: String,
            unique: true,
        },
        email: {
            required: true,
            type: String,
            unique: true,
        },
        password: {
            required: true,
            type: String,
            min: 8,
            max: 255,
        },
    },
    {timestamps: true},
);

const User = mongoose.model("user", userSchema);

export default User;