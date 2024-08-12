import express from "express";
import cors from "cors";
const corsOptions = {
  origin: (["http://localhost:5173"]),
};
const app = express();
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.json({fruits : ["applee", "orange"]});
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});