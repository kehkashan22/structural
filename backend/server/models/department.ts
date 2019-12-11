import mongoose, { Schema } from 'mongoose';

//Mongo schema for department
const Department: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export = mongoose.model('Departments', Department);