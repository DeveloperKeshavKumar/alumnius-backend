import express, { json, urlencoded } from 'express';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/', router);

app.listen(PORT, () => {
   console.log(`Running on http://localhost:${PORT}`)
})