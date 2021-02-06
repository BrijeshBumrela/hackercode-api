import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.y8mcc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(console.log)
    .catch(console.error);

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
