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
    try {
        const dataFromDb = await database.getAll();
        return res.status(200).json(dataFromDb);
    } catch (error) {
        console.error('GET / error accessing DB:', error);
        return res.status(503).json({ error: 'Service unavailable', details: error.message });
    }
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



// Esperar a conectar a la BD antes de iniciar el servidor
async function start() {
    try {
        console.log('Connecting to MongoDB...');
        await database.connect();
        await database.getCollection(process.env.COLLECTION_NAME || 'granjapico');
        app.listen(process.env.PORT || port, () => {
            console.log(`Server listening on http://localhost:${process.env.PORT || port}`);
        });
    } catch (error) {
        console.error('Failed to start server due to DB error:', error);
        process.exit(1);
    }
}

start();



