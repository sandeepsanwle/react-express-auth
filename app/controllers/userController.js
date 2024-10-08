const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hash');


// Create a new user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.locals.message = "User already exists";
            return res.status(400).json();
        }

        const hashpassword = await hashPassword(password)

        const user = new User({ name, email, password: hashpassword });
        await user.save();
        res.locals.message = "User created successfully";
        res.status(201).json();
    } catch (error) {
        res.locals.message = "An error occurred while creating the user";
        res.status(500).json();
    }
};

const loginUSer = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.locals.message = "Invalid email or password";
            return res.status(400).json();
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            res.locals.message = "Invalid email or password";
            return res.status(400).json();
        }

        const token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.locals.message = "Login successful";
        res.json({token: `Bearer ${token}`});
    } catch (error) {
        res.locals.message = "Server error";
        res.status(500).json();
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.locals.message = "Users fetched sccessfully";
        res.status(200).json(users);
    } catch (error) {
        res.locals.message = "An error occurred while fetching the user";
        res.status(500).json();
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.locals.message = "User not found";
            res.status(404).json();
        }
    } catch (error) {
        res.locals.message = "An error occurred while fetching the user";
        res.status(500).json();
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.locals.message = "User updated successfully";
            res.status(200).json(user);
        } else {
            res.locals.message = "User not found";
            res.status(404).json();
        }
    } catch (error) {
        res.locals.message = "An error occurred while updating the user";
        res.status(500).json();
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.locals.message = "User deleted successfully";
            res.status(200).json();
        } else {
            res.locals.message = "User not found";
            res.status(404).json();
        }
    } catch (error) {
        res.locals.message = "An error occurred while deleting the user";
        res.status(500).json();
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUSer
};
