const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

    username: {
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
    }
    // plugins: [{
    //     type: Object,
    //     control: {
    //         type: String
    //     },
    //     default: {
    //         type: Number
    //     },
    //     min: {
    //         type: Number
    //     },
    //     max: {
    //         type: Number
    //     }
    // }]
})

// PluginSchema.index({
//     sellerName: 'text',
//     creator: 'text',
//     description: 'text',
//     tag: 'text'
// });
module.exports = User = mongoose.model('User', UserSchema);