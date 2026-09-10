const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const checkuser = await userModel.findOne({
            $or:[
                {username},
                { email }
            ]
        });

        if (checkuser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hash= await bcrypt.hash(password,10)   // here password change into a hash code

        const user = await userModel.create({
            username,
            email,
            password : hash,
        });

        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET)

        res.cookie("token",token) // token store in cookie

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {id: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    signup,
    login,
};