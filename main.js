import express from "express";
import { MongoDB} from './bd.js';
import cors from 'cors';

const user = process.env.USER_BD;
const db_password = process.env.KEY_BD;
const url = `mongodb+srv://${user}:${db_password}@test.slygxwk.mongodb.net/?appName=test`;

const app = express();
const port = process.env.PORT || 2000;

// middleware to parse JSON bodies
app.use(express.json());
app.disable('x-powered-by');

const AccessControl = [

] 

app.use(cors({
  origin: 'web-66vzoi1semdv.up-de-fra1-k8s-1.apps.run-on-seenode.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


const granja = new MongoDB(url, 'sample_mflix');
await granja.connect();
await granja.getCollection('granjapico');

app.get('/stock', async (req, res) => {
    // Return all documents from the configured collection
    res.json(await granja.getAll(granja.collection));
});

app.get('/stock/:id', async (req, res) => {
    const { id } = req.params;
    const item = await granja.getById(id,granja.collection);
    return res.json(item);

});

app.post('/stock/',async (req, res) => {
    const newItem =  req.body;
    await granja.insertItem(newItem,granja.collection);
    return res.status(201).json({ message: 'Item inserted', item: newItem  });

});

app.listen(port, () => {
    console.log(`port http://localhost:${port}`);
});



