const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Only start the server if this file is not imported in tests
if (require.main === module) {
app.listen(3000, '0.0.0.0', () => {
    console.log('Example app listening at http://localhost:3000');
});
}

module.exports = app;  // Export app for testing
