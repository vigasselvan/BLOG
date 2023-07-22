//jshint esversion:6

//go to '/compose' page to create new blog.

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.connect("mongodb+srv://admin-vigas:welcome123@cluster0.yieowhx.mongodb.net/blogDB");

const homeStartingContent = "Hello Everyone, I am VIGAS, Student studing computer science. This website is created to post my thoughts and experience to the world. This websote is created by myself. I am a MERN developer, making websites for clients for living🤙.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Email ID: vigasselvan@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema = {
  title: String,
  content: String
};

const Blog = mongoose.model("blog", blogSchema);

const Contents = {
  homeStartingContent: homeStartingContent, //references the variable above created.
  aboutContent: aboutContent,               //the same as above
  contactContent: contactContent            //same
};


app.get('/', (req, res) => {
  Blog.find().then( docs => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      Blog: docs
    }); 
  });             // Render the 'index' template with the provided data 
});

app.get('/home', (req, res) => {
  Blog.find().then( docs => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      Blog: docs
    }); 
  });            // Render the 'index' template with the provided data
});

app.get('/about', (req, res) => {           //code to render about us page
  res.render('about', Contents);
});

app.get('/contact', (req, res) => {
  res.render('contact', Contents);
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
   
  /*const cont = {
    text: req.body.postintro,
    post: req.body.postbody
  }*/
  
  const blog = new Blog({
    title: req.body.postintro,
    content: req.body.postbody
  });
  blog.save();
 
  //pos.push(cont);                           //appends the feedback of the user
  res.redirect('/');                        //redirects the browser to home page.

});

app.get('/post/:valu', (req, res) => {

  const enteredTxt = _.lowerCase(req.params.valu);
  var newTitle = "";
  var newContent = "";  
  
  //finding the matching doc and directly rendering
  Blog.find().then(docs =>{
    docs.forEach(doc => {
      if (enteredTxt == _.lowerCase(doc.title)){            //LODASH function to convert convert any type of words to lowercase.
        res.render("post", {  
          newTitle: doc.title,
          newContent: doc.content
        });
      }        
    });
  }).catch(err =>{
    console.log(err);
  });

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
