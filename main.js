import express from "express";
import fs from 'fs';
import { MongoDB } from './bd.js';

const user = process.env.USER_BD;
const password = process.env.KEY_BD;

const url = `mongodb+srv://${user}:${password}@test.slygxwk.mongodb.net/?ssl=true&retryWrites=true&w=majority`;
// cargar base de datos 
const database = new MongoDB(url,"sample_mflix")
database.connect();
database.getCollection("granjapico");



// Cargar data.json sin usar import assertions (más compatible)
// const data = JSON.parse(fs.readFileSync(new URL('./data.json', import.meta.url), 'utf8'));
import cors from 'cors';


const app = express();
const port = process.env.PORT || 80;
// Cargar datos desde data.json

// middleware to parse JSON bodies
app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.get('/', async (req, res) => {
    // Return a simple API message
    const dataFromDb =  await database.getAll();
    console.log(dataFromDb);
    return res.status(200).json(dataFromDb);
});


app.post('/stock/', async (req, res) => {
    const newItem = req.body;
    database.insertItem(newItem);
    return res.status(201).json({ message: 'Item added', item: newItem });

});

// Example GET for a single stock item (placeholder)
app.get('/stock/:id', async (req, res) => {
    const { id } = req.params;
    const item = await database.getById(id);
    if (item) {
        return res.status(200).json(item);
    } else {
        return res.status(404).json({ message: 'Item not found'})
        }});



app.listen(port, () => {
    console.log(`port http://localhost:${port}`);
});



