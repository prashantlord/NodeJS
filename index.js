import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

mongoose
    .connect("mongodb://admin:password@localhost:3001/mydb?authSource=admin")
    .then(() => {
        console.log("Mongo Connected Successfully");
    })
    .catch((err) => {
        console.error(err);
    });

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

app.use(express.urlencoded({extended: true}));

app
    .route("/api/users")
    .get(async (req, res) => {
        const users = await User.find();
        if (users) res.json(users);
        else res.status(200).json({message: "Didn't find any users"});
    })
    .post(async (req, res) => {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        try {
            const user = await User.create({username, email, password});
            res.status(201).json({message: "User created successfully", user});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: err.message});
        }
    });

app
    .route("/api/users/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const user = await User.findById(id);
            res.status(200).json({message: "User found", user});
        } catch (err) {
            console.error(err);
            res.status(400).json({message: err.message});
        }
    })
    .put(async (req, res) => {
        const id = req.params.id;
        const {username, email, password} = req.body;
        try {
            const user = await User.findByIdAndUpdate(id, {
                username,
                email,
                password
            });
            const newUser = await User.findById(id);
            res.status(200).json({ message: "User Updated Successfully", newUser });
        } catch (err) {
            console.log(err);
            res.status(400).json({message: err.message});
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json({message: `User with the id: ${id} was deleted successfully`})
        } catch (err) {
            console.error(err);
            res.status(400).json({message: err.message});
        }
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
