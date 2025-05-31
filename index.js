require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster23.vxjxadf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const taskCollection = client.db("workLynxDB").collection("tasks");

    app.post("/tasks", async (req, res) => {
      const newTasks = req.body;

      const result = await taskCollection.insertOne(newTasks).find({}).sort;
      res.send(result);
    });
    app.get("/tasks", async (req, res) => {
      const result = await taskCollection
        .find({})
        .sort({ deadline: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    // await client.close()
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server running and vercel connect properly");
});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
