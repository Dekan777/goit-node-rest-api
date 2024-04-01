import mongoose from 'mongoose';

import app from './app';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(3000)
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    })

