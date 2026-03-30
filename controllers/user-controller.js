import User from "../models/user.js";

export async function getUserData(req, res) {

    const users = await User.find();
    if (users) res.json(users); else res.status(200).json({message: "Didn't find any users"});
}

export async function storeUserData(req, res) {
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
}

export async function showUserData(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({message: "User found", user});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
}

export async function editUserData(req, res) {
    const id = req.params.id;
    const {username, email, password} = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, {
            username, email, password
        });
        const newUser = await User.findById(id);
        res.status(200).json({message: "User Updated Successfully", newUser});
    } catch (err) {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

export async function deleteUserData(req, res) {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: `User with the id: ${id} was deleted successfully`})
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
}