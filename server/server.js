const express = require('express');
const { connectDB } = require("./config/db");
const taskController = require("./routes/taskRoutes")
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());

connectDB();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use("/tasks", taskController);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
