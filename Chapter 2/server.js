// The address of this server connected to the network is: 
// URL: http://localhost:8383
//IP : 127.0.0.1:8383

const express = require('express'); //requiring express package to use the packages present in it

const app = express() //to create our backend app or initialises it
//IP address is the address of the device and a port is a location in the device
const PORT = 8383; //ANY 4 DIGIT NUMBER

// we need to configure the paths to let the browser get the server
//HTTP VERBS AND ROUTES

app.get('/', (req,res)=>{
    //as we open the website we come to know that the endpoint was reached by the browser and the output is shown on the screen
    console.log("yay i hit an endpoint boom!!", req.method)
    res.sendStatus(200)
})


app.listen(PORT, ()=>{console.log(`Server has started on: ${PORT}`)}) //goes at the very bottom it litsens to the incoming requests