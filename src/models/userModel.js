import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
});

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'user', 'customer'], 
        default: 'customer' 
    },
    personalInfo: {
        fullName: { 
            type: String, 
            required: true, 
            trim: true, 
            match: /^[a-zA-Z\s]*$/ 
        },
        dateOfBirth: { 
            type: Date, 
            required: true 
        },
        gender: String,
        nationality: String,
    },
    contactInfo: {
        email: { 
            type: String, 
            required: true, 
            lowercase: true, 
            trim: true, 
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ 
        },
        phone: { 
            type: String, 
            trim: true 
        },
        address: addressSchema,
    },
    preferencesStyle: {
        favoriteColors: [String],
        fabricPreferences: [String],
        styleNotes: String,
    },
    measurementHistory: [{
        chest: { type: Number, required: true },
        waist: { type: Number, required: true },
        hips: { type: Number, required: true },
        armLength: Number,
        legLength: Number,
        dateMeasured: { type: Date, default: Date.now },
    }],
    previousOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }],
}, { timestamps: true });

userSchema.virtual('age').get(function() {
    const today = new Date();
    const birthDate = new Date(this.personalInfo.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
