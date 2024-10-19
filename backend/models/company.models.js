import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    website: {
    },
    address: {
        type: String,
    },
    logo: {
        type: String,
    },
    useId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

export default mongoose.model('Company', companySchema)