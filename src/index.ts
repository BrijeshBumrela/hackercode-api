import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Always keep dotenv before, if you have any env variables used in the init script of the app
dotenv.config();

import app from './app';

const port = process.env.PORT || 3000;
const dbString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y8mcc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(console.error);

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
