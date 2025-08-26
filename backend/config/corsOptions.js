const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, "*");
    callback(null, origin);
  },
  credentials: true,
  methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

module.exports = corsOptions;