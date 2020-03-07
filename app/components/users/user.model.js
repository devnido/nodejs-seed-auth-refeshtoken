const mongoose = require('mongoose');

const authdb = require('../../framework/database/db.connect');

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator: function(val) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
            },
            message: 'invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!']
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked']
    },
    refreshToken: {
        type: String
    },
    refreshTokenExpDate: {
        type: Date
    }
    resetPassToken: {
        type: String
    },
    resetPassTokenExpDate: {
        type: Date
    }
}, {
    timestamps: true
})



const User = authdb.model('user', Schema)

module.exports = User