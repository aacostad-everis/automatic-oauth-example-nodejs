app = require('./src/app');

// Start server
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Express server started on port ' + port));