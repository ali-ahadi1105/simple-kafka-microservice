import express from "express"; 
import CatalogRoute from './routes/catalog.route';

const app = express();

app.use('/', CatalogRoute);

app.use(express.json());

export default app;