import express, { Application, Request, Response } from 'express';
import path from "path";
import cors from 'cors';
import PaymentRoutes from './routes/payment';

const app: Application = express()
const port = 3001


// Body parsing Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/logo.png", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.use('/api/payment', PaymentRoutes);
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
})


try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`)
}