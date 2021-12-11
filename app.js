// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/c212bd6021";

  const options = {
    method: "POST",
    auth: "Ritish:05e9d2df40766661105a8ba55f18d93f-us20"
  };

  const request = https.request(url,options,function(response){

    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/tryagain",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT,function(req,res){
  console.log("Server started at 3000");
});


// API
// 05e9d2df40766661105a8ba55f18d93f-us20

// List Id:
// c212bd6021
