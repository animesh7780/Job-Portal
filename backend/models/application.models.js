import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Latka Hai', 'Ho gaya Beti', 'Dhatt Sala'],
        default: 'Latka Hai'
    },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema)