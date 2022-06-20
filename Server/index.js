const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./lib/mongodb");
const { IS_PROD, PORT, NODE_ENV, CORS_ORIGINS } = require("./utils/constants");

connectDB().then(() => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        ...CORS_ORIGINS.split(","),
      ],
    })
  );
  if (!IS_PROD) app.use(morgan("dev"));

  // Routes
  app.use("/auth", require("./routes/auth.routes"));
  app.use("/users", require("./routes/users.routes"));
  app.use("/books", require("./routes/books.routes"));
  app.use("/orders", require("./routes/orders.routes"));

  app.listen(PORT, () => {
    console.log(
      `Server up & running in ${NODE_ENV} mode & is listening for requests at http://127.0.0.1:${PORT}`
    );
  });
});
