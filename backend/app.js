const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { InboxStream, InboxStreamOptions, CommentStream, Poll } = require("snoostorm");
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const Axios = require('axios');
require('dotenv/config');

const Donation = require('./models/DonationRequest');


app.use(cors());
app.use(bodyParser());

//Import Rouotes
const postsRoute = require('./routes/posts');
//const confirmationRoute = require('./routes/confirmation');

app.use('/posts', postsRoute);
//app.use('/donations', confirmationRoute);
//middleware




//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/posts', (req, res) => {
    res.send('We are on post');
});
app.listen(4000);


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true },  () => console.log('connected to DB!'));


//REDDIT API STUFF
const r = new Snoowrap({
  userAgent: 'reddit-bot-example-node',
  clientId: process.env.REDDIT_CLIENT,
  clientSecret: process.env.REDDIT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

const client = new Snoowrap(r);


app.get('/donations/:user/:comment/:donationId', async (req, res) => {
  try {
    console.log("here");
    //const donation = await Donation.findOneAndUpdate({user: req.params.user, comment: req.params.comment, complete: false, donation_id: ''}, {complete:true});
    res.json(await r.getSubmission(req.params.parent.substring(3)));
    /*const donation = await Donation.findOne({user: req.params.user, comment: req.params.comment, complete: false, donation_id: ''});
    console.log(donation);
    if(donation === null) {
        res.sendStatus(404);
        return;
    }  

    const justGivingDonation = await Axios.get(process.env.JUST_GIVING_API + '/' + process.env.JUST_GIVING_APP_ID + '/v1/donation/' + req.params.donationId);
    

    if(justGivingDonation == null) {
      res.sendStatus(404);
      return;
    }
    if(justGivingDonation.thirdPartyReference == null || justGivingDonation.thirdPartyReference != 'reddit_Donate-Bot') {
      res.sendStatus(404);
      return;
    }
    if(justGivingDonation.amount == 0) {
      return;
    }

    if (await Donation.findOne({donation_id: req.params.donationId}) != null) {
      return;
    }

    r.getSubmission(req.params.parent);

    */

    
  } catch(err) {
    res.json({message: err});
  }
});



options = {
  filter: "unread",
  pollTime: 2000,
  limit: 5
};

const inbox = new InboxStream(client, options);
inbox.on("item", async (item) => {
  console.log(item);
  r.markMessagesAsRead([item]);
  if(item.body.includes('/u/Donate-Bot') && item.parent_id != null) {
    
    console.log('Donation to begin');
    const donation = new Donation({
      user: item.author.name,
      comment: item.parent_id,
      comment_user: 'item.'
    });
    try {
      const savedDonation = await donation.save();
      
    } catch(err) {
      console.log(err);
    } 

    r.composeMessage({to:item.author.name, subject:'Your Donation Link', text: process.env.FRONT_END_LINK+'/donate/' + item.author.name + '/' + item.parent_id});
    
  }

});

/*
const stream = new CommentStream(r, { subreddit: "all", results: 25 });

stream.on("item", comment => {
    console.log(comment)
})
*/

/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ShrinikethN:<password>@testingcluster.eoygd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongodb+srv://ShrinikethN:<password>@testingcluster.eoygd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/

//tjG03D1vhVJcyK38