const corsAnywhere = require('cors-anywhere');

const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Permet l'accès depuis toutes les origines
  requireHeaders: [],
  removeHeaders: [],
}).listen(port, host, () => {
  console.log(`CORS Anywhere server is running on http://${host}:${port}`);
});