
import { MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

const user = process.env.USER_BD
const db_password = process.env.KEY_BD

const url = `mongodb+srv://${user}:${db_password}@test.slygxwk.mongodb.net/?appName=test`;

// Habilitar TLS/SSL por defecto. Puedes controlar esto con las siguientes
// variables de entorno en entornos donde necesites desactivar la verificación
// de certificados (solo para desarrollo):
// - DB_TLS ("true"|"false")  -> si la conexión usa TLS. Por defecto true.
// - DB_TLS_INSECURE ("true"|"false") -> si se permiten certificados inválidos.
const tls = process.env.DB_TLS ? process.env.DB_TLS === 'true' : true;
const tlsAllowInvalidCertificates = process.env.DB_TLS_INSECURE === 'true';

export class MongoDB {
    constructor(url,dbName) {
        this.client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            // Opciones TLS/SSL explícitas. Para conexiones a Atlas via mongodb+srv
            // TLS normalmente está habilitado por defecto, pero las opciones
            // explícitas ayudan cuando el servidor exige SSL.
            tls,
            tlsAllowInvalidCertificates,
        })

        this.dbName = dbName;
        this.db = null;
        this.collection = null;
    }

    async connect(){
        await this.client.connect();
            // Send a ping to confirm a successful connection
        await this.client.db("admin").command({ ping: 1 });
        console.log('conectado a la bd')
        // this.db = await awthis.client.db(this.dbName);
    }

    async getCollection(collectionName){
        if (!this.db) {
            this.db = this.client.db(this.dbName);
            this.collection = this.db.collection(collectionName);   
        }
    }
    async getAll(){
        return await this.collection.find({}).toArray()
    }
    
    
    async close() {
        await this.client.close()
        console.log('conexion cerrada')
    }
    
    
    
    async getAll(){
        return await this.collection.find({}).toArray()
    }
    async getById(id,) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }
    
    async insertItem(doc,) {
        await this.collection.insertOne(doc);
    }
    
    async update(id, patch,) {
        return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    }
    
    async delete(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
    
}




export default  MongoDB

// lsita