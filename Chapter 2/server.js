// The address of this server connected to the network is: 
// URL: http://localhost:8383
//IP : 127.0.0.1:8383

const express = require('express'); //requiring express package to use the packages present in it

const app = express() //to create our backend app or initialises it
//IP address is the address of the device and a port is a location in the device
const PORT = 8383;//ANY 4 DIGIT NUMBER



let data = ['priyam']

//middleware
app.use(express.json())


// we need to configure the paths to let the browser get the server
//ENDPOINT - HTTP VERBS (METHOD OF THE REQUEST) AND ROUTES (OR PATHS)

//type 1 website endpoints (visual): send back the html code for the website to load.
app.get('/', (req,res)=>{
    console.log("The user requested the homepage of the website")
    //as we open the website we come to know that the endpoint was reached by the browser and the output is shown on the screen
    res.send(`
        <body style = "background:pink; color: blue">
        <h1>Data:</h1>
        <a href = "/dashboard">Dashboard</a>
        <p>${JSON.stringify(data)}</p>
        <script>console.log("This is the response script")</script>
        </body>
        `)
})

app.get('/dashboard', (req, res)=>{
    res.send(`
            <body>
            <h1>Dashboard</h1>
            <a href = "/">Home</a>
            </body>
        `)
})

//Type -2 API endpoints (non-visual)

app.get('/api/data', (req, res)=>{
    console.log('This one was for data')
    res.status(200).send(data)
})

app.post('/api/data', (req, res)=>{

    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name);
    res.sendStatus(201)
})

app.delete('/api/data', (req, res)=>{
    data.pop()
    console.log('We deleted the element of the end of the array')
    res.sendStatus(200)
})



app.listen(PORT, ()=>{console.log(`Server has started on: ${PORT}`)}) //goes at the very bottom it litsens to the incoming requests