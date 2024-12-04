const mongoose = require('mongoose');

async function connectMongoDB() {
    let mongoDbUrl;

    if(process.env.NODE_ENV === "development"){
        mongoDbUrl = process.env.MONGO_URI_DEV;
    }else{
        mongoDbUrl = process.env.MONGO_URI_PROD;
    }
    
    // MongoDB Connection
    await mongoose.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error.message);
        });
}

module.exports = connectMongoDB;