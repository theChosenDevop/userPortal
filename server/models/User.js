const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 6
    },
    email: {
        type: String,
        require: [true, 'Please provide email'],
        minlength: 6,
        validator: {
            
        }
    },
    password: {
        type: String,
        require: [true, 'Please provide password']
    }
})