
import express from 'express';

import subTaskRoutes from './Routes/subTaskRoutes.js';
import taskRoutes from './Routes/taskRoutes.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ping',function(_req,res){
    res.send('Pong');
})


// Routes
app.use('/tasks', taskRoutes);
app.use('/subtasks', subTaskRoutes);
app.use('/api/users', userRoutes);

app.all('*',(_req,res)=>{
    res.status(404).send('OOPS!!  404 page not found ')
})


export default app;