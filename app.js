//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');




const homeStartingContent = "Welcome to Explore Uttarakhand, your ultimate guide to the enchanting beauty and rich culture of Uttarakhand. Here, you'll discover firsthand experiences shared by visitors who have explored the breathtaking landscapes and vibrant destinations of this Himalayan state. Whether you're planning a trip or simply seeking inspiration for your next adventure, our collection of travel stories and insights will help you craft the perfect itinerary. Explore Uttarakhand through the eyes of fellow travelers and embark on a journey that promises to be as unforgettable as the destination itself.";
const aboutContent = "Discover the enchanting beauty and rich cultural heritage of Uttarakhand, a land of pristine natural landscapes and spiritual experiences. From the majestic peaks of the Himalayas to the tranquil lakes and lush forests, Uttarakhand offers a diverse array of experiences for every traveler.";
const contactContent =`Have a question or need assistance planning your trip to Uttarakhand? We're here to help! Reach out to us for personalized travel advice, itinerary suggestions, or any other inquiries you may have. Our team of travel experts is dedicated to ensuring your Uttarakhand experience is unforgettable.
     
Address:
Dehradun   

Phone:
6398588044

Email:
adarshn6467@gmail.com

Office Hours:
Monday - Friday: 9:00 AM - 5:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed

Feel free to contact us via phone or email, or visit our office during our office hours. We look forward to hearing from you and helping you plan your dream trip to Uttarakhand!`;

const app = express();
let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


let link="mongodb+srv://adarshn6467:Test123@cluster0.w5zc3k5.mongodb.net/Posts"




mongoose.connect(link, {useNewUrlParser: true});


 

const postSchema = {
  title: String,
  content: String
 };

const Post = mongoose.model("Post", postSchema);

app.get("/",function(req,res)
{

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent : aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent : contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})




app.post("/compose",function(req,res){

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
})




app.get("/posts/:postName",function(req,res){
  const requestedPostId = req.params.postName;
  // console.log(requestedPostId);
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      postTitle: post.title,
      postBody: post.content
    });
  });
});

let port= process.env.PORT;
if(port== null || port == ""){
    port=443;
}


app.listen(port, function() {
  console.log("Server started on port 443");
});
