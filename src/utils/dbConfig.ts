import mongoose  from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Connected to mongodb");
        });

        connection.on('error',(error)=>{
                console.log("connection to mongodb failed. Please try again later." + error);
                process.exit();
        });
         
    } catch (error) {
        console.log('something went wrong while connection to MongoDb',error)
    }
}