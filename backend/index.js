import 'dotenv/config'
import { app } from './app.js';
import { connectDB } from './src/DB/db.js';


const PORT = process.env.PORT || 8001;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
).catch((error) => {
    console.log(`Error: ${error.message}`);
});

