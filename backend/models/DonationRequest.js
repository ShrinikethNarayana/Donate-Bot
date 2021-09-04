const mongoose = require('mongoose');


const DonationRequestSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    comment_user: {
        type: String,
        required: true
    },
    donation_id: {
        type: String,
        default: ''
    },
    complete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Donations', DonationRequestSchema);