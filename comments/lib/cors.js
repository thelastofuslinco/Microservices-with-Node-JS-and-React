const cors = require('cors');

function makeCors() {
  const env = process.env.NODE_ENV || 'development';
  const raw = process.env.ALLOWED_ORIGINS || 'http://localhost:5172';
  const allowed = raw.split(',').map((s) => s.trim()).filter(Boolean);

  if (env !== 'production') {
    return cors();
  }

  return cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowed.indexOf(origin) !== -1) return callback(null, true);
      callback(new Error('Not allowed by CORS'));
    },
  });
}

module.exports = makeCors;
