import { app } from './api';

const API_PORT = process.env.API_PORT ?? 4682;

app.listen(API_PORT, () => console.log(`Server is running at http://localhost:${API_PORT}`));
