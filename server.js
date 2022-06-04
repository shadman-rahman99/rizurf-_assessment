require('dotenv').config({ path: './config.env' });

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Connect DB
connectDB();

const app = express();

app.use(express.json());

// ? cennecting routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler (Should be the last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// prettier-ignore
// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  // eslint-disable-next-line no-console
  console.log('Logged Error:');
  // eslint-disable-next-line no-console
  console.log(err);
  server.close(() => process.exit(1));
});
