import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Seeker', 'Provider'],
        required: true
    },
    profile: {
        bio: [{ type: String }],
        skills: [{ type: String }],
        resume: [{ type: String }],
        resumeOriginalName: [{ type: String }],
        Company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
        profilePicture: {
            type: String,
            default: ""
        },
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);