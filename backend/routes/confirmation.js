const express = require('express')
const router = express.Router();
const Donation = require('../models/DonationRequest');

router.get('/:user/:comment', async (req, res) => {
    try {
        const donation = await Donation.findOne({user: req.params.user, comment: req.params.comment});
        console.log(donation);
        if(donation === null) {
            res.sendStatus(404);
        }
        if(!donation.complete) {
            console.log(donation);

        } else {
            res.json()
        }
        res.json(donation);
    } catch(err) {
        res.json({message: err});
    }
});
module.exports = router;