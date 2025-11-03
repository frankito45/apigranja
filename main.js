import express from "express";
import fs from 'fs';

// Cargar data.json sin usar import assertions (más compatible)
const data = JSON.parse(fs.readFileSync(new URL('./data.json', import.meta.url), 'utf8'));
import cors from 'cors';


const app = express();
const port = process.env.PORT || 80;
// const databd = data; // Cargar datos desde data.json

// middleware to parse JSON bodies
app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.get('/', async (req, res) => {
    // Return a simple API message
    res.json({ message: 'API Granja Pico' });
});


// Example GET for a single stock item (placeholder)
app.get('/stock/:id', async (req, res) => {
    const { id } = req.params;
    // Si tienes una instancia de la BD, aquí la usarías:
    // const item = await granja.getById(id);
    // return res.json(item);

    // Respuesta de ejemplo cuando no hay BD conectada
    return res.status(200).json({ id, message: 'Ruta /stock/:id - implementa la búsqueda en la BD' });
});

// POST que demuestra recibir JSON en el body
app.post('/stock', async (req, res) => {
    const newItem = req.body;
    console.log('POST /stock received JSON:', newItem);

    // Aquí insertarías en la BD si la tuvieras conectada
    // await granja.insertItem(newItem);

    return res.status(201).json({ message: 'Item received', item: newItem });
});

app.listen(port, () => {
    console.log(`port http://localhost:${port}`);
});



