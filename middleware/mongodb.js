import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState)
        return handler(req, res); // Use current db connection

    // Use new db connection
    const DB_URL = "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;
    await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
    });
    return handler(req, res);
};

const createConnection = async () => {
    if (!mongoose.connections[0].readyState) {
        const DB_URL = "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: "admin",
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
        });
    }
};

export { connectDB, createConnection };