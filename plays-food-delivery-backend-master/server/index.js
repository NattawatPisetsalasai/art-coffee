import { config } from 'dotenv';
import app from './app';

config();

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, async () => {
  console.log('boilerplate');
});