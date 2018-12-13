const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PluginSchema = new Schema({

    sellerName: {
        type: String,
        required: true
    },
    siteSellerUrl: {
        type: String,
        required: true
    },

    creator: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tag: {
        type: [Object]
    },
    parametres: [{
        type: Object,
        control: {
            type: String
        },
        default: {
            type: Number
        },
        min: {
            type: Number
        },
        max: {
            type: Number
        }
    }]
})

PluginSchema.index({
    sellerName: 'text',
    creator: 'text',
    description: 'text'
    // tag: 'text'
});
module.exports = Plugin = mongoose.model('Plugin', PluginSchema);