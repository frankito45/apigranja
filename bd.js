
import { MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

export class MongoDB {
    constructor(url,dbName) {
        this.client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },

        })

        this.dbName = dbName;
        this.db = null;
        this.collection = null;
    }

    async connect(){
        try {
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log('Conexión exitosa a MongoDB');
        } catch (error) {
            console.error('Error de conexión a MongoDB:', error);
            throw error;
        }
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
    
    async insertItem(doc) {
        await this.collection.insertOne(doc);
    }
    
    async update(id, patch,) {
        return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    }
    
    async delete(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
    
}


