import { app } from './app';

const API_PORT = process.env.PORT ?? 3000;

app.listen(API_PORT, () => console.log(`Server is running at http://localhost:${API_PORT}`));
