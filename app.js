const express = require('express');
const app = express();
const https = require('https');
const bodyParse = require('body-parser');
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const apiKey = process.env.API_KEY;

app.use(bodyParse.urlencoded({extends:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    //res.send("No Data Available!");
});

app.post("/",function(req,res){
    //console.log( req.body );

    var city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+state+","+country+"&APPID="+apiKey+"&units=metric";
    console.log(url);
    

    https.get(url,function(response){
        //console.log(response);

        response.on('data',function(data){
            // console.log(data);

            //city = "mo";
            const weatherData=JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const main = weatherData.weather[0].main;

            const iconId = weatherData.weather[0].icon;
            const imgSrc = "http://openweathermap.org/img/wn/"+iconId+"@2x.png";

            res.write("<p>The weather in "+city+" is currently "+description+"</p>");
            console.log(city);

            res.write("<h1>Temp : "+temp+" celcius "+", Main : "+main+"</h1>");

            res.write("<img src="+imgSrc+"></img>");

            res.send();
        });

    });

});

app.listen(3001,function(){
    console.log("Your server is at : localhost:3001");
});