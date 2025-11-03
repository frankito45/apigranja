
// import { MongoClient, ServerApiVersion, ObjectId} from 'mongodb';

// const user = process.env.USER_BD
// const db_password = process.env.KEY_BD

// // Configuración de la URL de conexión con parámetros SSL explícitos
// const url = `mongodb+srv://${user}:${db_password}@test.slygxwk.mongodb.net/?ssl=true&retryWrites=true&w=majority`;

// // Configuración SSL/TLS más permisiva para desarrollo
// const isDevEnvironment = process.env.NODE_ENV !== 'production';
// const ssl = true; // Siempre usar SSL
// const sslValidate = !isDevEnvironment; // Solo validar certificados en producción

// export class MongoDB {
//     constructor(url,dbName) {
//         this.client = new MongoClient(url, {
//             serverApi: {
//                 version: ServerApiVersion.v1,
//                 strict: true,
//                 deprecationErrors: true,
//             },
//             ssl: ssl, // Siempre usar SSL
//         })

//         this.dbName = dbName;
//         this.db = null;
//         this.collection = null;
//     }

//     async connect(){
//         try {
//             await this.client.connect();
//             // Send a ping to confirm a successful connection
//             await this.client.db("admin").command({ ping: 1 });
//             console.log('Conexión exitosa a MongoDB');
//         } catch (error) {
//             console.error('Error de conexión a MongoDB:', error);
//             if (error.message.includes('SSL routines')) {
//                 console.error('Error SSL/TLS. Verifica la configuración SSL y los certificados.');
//             }
//             throw error;
//         }
//     }

//     async getCollection(collectionName){
//         if (!this.db) {
//             this.db = this.client.db(this.dbName);
//             this.collection = this.db.collection(collectionName);   
//         }
//     }
//     async getAll(){
//         return await this.collection.find({}).toArray()
//     }
    
    
//     async close() {
//         await this.client.close()
//         console.log('conexion cerrada')
//     }
    
    
    
//     async getAll(){
//         return await this.collection.find({}).toArray()
//     }
//     async getById(id,) {
//         return await this.collection.findOne({ _id: new ObjectId(id) });
//     }
    
//     async insertItem(doc,) {
//         await this.collection.insertOne(doc);
//     }
    
//     async update(id, patch,) {
//         return await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: patch });
//     }
    
//     async delete(id) {
//         return await this.collection.deleteOne({ _id: new ObjectId(id) });
//     }
    
// }




// export default  MongoDB

// // lsita