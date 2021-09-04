const mongoose = require('mongoose');


const DonationIdSchema = mongoose.Schema({
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
    complete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('DonationIds', DonationRequestSchema);