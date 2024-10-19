import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (fullname == null || email == null || password == null || phoneNumber == null || role == null) {
            returnres.status(400).json({
                error: "All fields are required",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                error: "User already exists",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        })
        return res.status(200).json({
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                error: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "User not found",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid credentials",
                success: false
            });
        }
        if (user.role !== role) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome Back ' + ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successful",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                error: "All fields are required",
                success: false
            });
        }
        const skillsArray = skills.split(",");
        const userId = req.id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                error: "User not found",
                success: false
            });
        }
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}