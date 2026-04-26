// Entry Point

require('dotenv').config();
const app = require('./src/app');
const sequelize = require ('./src/config/db');
const PORT = 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Database connected succesfully');

        app.listen(PORT, () => {
            console.log('Server Running on port 3000')
        });
    })
    .catch((error) => {
        console.error('Unable to connect to Database', error)
    });


