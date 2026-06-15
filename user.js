const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ['man','woman'] },
    origin: { type: String, enum: ['usa','africa'] },
    city: String,
    bio: String,
    photos: [{ type: String }], // Cloudinary URLs
    interestedIn: [{ type: mongoose.Schema.Types.objectId, ref:'User' }],
    matches: [{ type: mongoose.Schema.Types.objectId, ref:'User' }]
}, { timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.comparePassword = async function(candidate) {
    return bcrypt.compare(candidate,this.password);
};

// ... existing schema ...
photos: [{ type: string }], // URLsisPremium: { type: Boolean, default:false },

likes [{ type: mongoose.Schema.Types.ObjectId, ref:'user'}]

module.exports = mongoose.module('User',userSchema);
    
