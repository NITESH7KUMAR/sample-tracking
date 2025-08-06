import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

import sampleRoutes from './routes/sample.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/samples', sampleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
