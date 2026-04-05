import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db';
import sessionRoutes from './routes/sessionRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/auth';
import reportRoutes from './routes/reportRoutes';
import resumeRoutes from './routes/resumeRoutes';
import path from 'path';

// Load env from root
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const app: Express = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('AI Mock Interviewer API is running (PostgreSQL)');
});

// Keep both route styles for local/dev and Vercel service routing.
// Local default:    /api/auth, /api/users, ...
// Vercel prefix:    /_/backend/api + /auth, /users, ...
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/users', '/users'], userRoutes);
app.use(['/api/sessions', '/sessions'], sessionRoutes);
app.use(['/api/reports', '/reports'], reportRoutes);
app.use(['/api/resume', '/resume'], resumeRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
