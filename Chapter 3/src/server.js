import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5003;
//http://localhost:5000
//get the file path from the url of the current module

const __filename = fileURLToPath(import.meta.url);
//get the directory name from the file path
const __dirname = dirname(__filename)

app.use(express.json());
//serves the HTML file from the /public directory
//Middleware
// tells express to serve all files from the public folder as static assets /file. Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../public')))

//serving up the HTML file form the public directory
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

app.listen(PORT, ()=>{
    console.log(`Server has started on port: ${PORT}`);
})