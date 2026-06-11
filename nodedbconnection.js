const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb://127.0.0.1:27017/mydatabase";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db('test');
        console.log("Database connection successful");

        const collection = database.collection('users');

        const userData = {
            name: "ali KHan",
            email: "jhon@gmail.com",
            age: 30
        }

        var result = await collection.insertOne(userData);  
        console.log(`New user inserted with id: ${result.insertedId}`);
        const id = result.insertedId;

        result = await collection.updateOne({_id: id}, {$set: {age: 31}});



        result = await collection.findOne({_id: id});
        console.log("Updated user data:", result);

        result = await collection.deleteOne({_id: id});
        result = await collection.find();

        console.log("All users:", await result.toArray());
        


    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

main()