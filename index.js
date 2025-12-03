const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.use('/tasks', tasksRouter);


app.use((req, res) => {
res.status(404).json({ error: 'Endpoint not found' });
});


app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
});


const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => console.log(`Task Manager API running on port ${PORT}`));
}


module.exports = app; // for tests