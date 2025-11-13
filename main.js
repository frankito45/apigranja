import express from "express";
import fs from 'fs';



// Cargar data.json sin usar import assertions (más compatible)
const data = JSON.parse(fs.readFileSync(new URL('./data.json', import.meta.url), 'utf8'));
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
    res.status(200).json({ message: 'API is running' });
    
});


app.post('/stock/', async (req, res) => {
    const newItem = req.body;
    
    const id = data.files.length + 1;
    newItem.id = id;    
    data.files.push(newItem);
    fs.writeFileSync(new URL('./data.json', import.meta.url), JSON.stringify(data, null, 2));
    return res.status(201).json({ message: 'Item added', item: newItem });
});

// Example GET for a single stock item (placeholder)
app.get('/stock/:id', async (req, res) => {
    const { id } = req.params;
    const item = data.files.find(element => element.id === parseInt(id));
    if(item){
        return res.status(200).json(item);
    }else{
        return res.status(404).json({'mensaje':'data no found'});
    }
});

app.get('/stock', async (req, res) => {
    res.status(200).json(data.files);
});


app.listen(port, () => {
    console.log(`port http://localhost:${port}`);
});



