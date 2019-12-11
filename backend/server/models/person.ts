import mongoose, { Schema } from 'mongoose';

//Mongo Schema  for one person in people database
const Person: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    departmentId: {
        type: String,
        required: true
    },
    managerId: {
        type: String //is null for CEO
    }
}, { collection: 'people' });

export = mongoose.model('People', Person);