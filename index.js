require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
    // await client.connect();

    const taskCollection = client.db("workLynxDB").collection("tasks");

    app.get("/tasks", async (req, res) => {
      try {
        const tasks = await taskCollection
          .find({})
          .sort({ deadline: -1 })
          .toArray();
        res.send(tasks);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch all tasks" });
      }
    });

    app.get("/tasks/limited", async (req, res) => {
      const result = await taskCollection
        .find({})
        .sort({ deadline: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    app.get("/tasks/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid Task ID" });
      }

      try {
        const query = { _id: new ObjectId(id) };

        const result = await taskCollection.findOne(query);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Server Error" });
      }
    });
    app.get("/tasks/my-posted-tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await taskCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/tasks/:email", async (req, res) => {
      const userEmail = req.params.email;

      const result = await taskCollection
        .aggregate([
          { $match: { postedBy: userEmail } },
          {
            $group: {
              _id: null,
              totalBids: { $sum: { $ifNull: ["$bidsCount", 0] } },
            },
          },
        ])
        .toArray();
      const totalBids = result[0]?.totalBids || 0;
      res.send({ totalBids });
    });

    app.post("/tasks", async (req, res) => {
      try {
        const newTask = req.body;
        const result = await taskCollection.insertOne(newTask);
        res.send(result);
      } catch (error) {
        console.error("MongoDB connection failed:", error);
      }
    });

    app.patch("/bids/:id", async (req, res) => {
      const { id } = req.params;
      const bidsCount = req.body;

      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $inc: { bidsCount: 1 },
        }
      );

      res.send(result);
    });

    app.put("/tasks/:id", async (req, res) => {
      const taskId = req.params.id;
      const updatedTask = req.body;

      try {
        const result = await taskCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: updatedTask }
        );

        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Task updated successfully" });
        } else {
          res.status(400).json({ message: "No changes were made" });
        }
      } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update task" });
      }
    });

    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid task ID" });
      }

      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.send({ message: "Task deleted" });
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } catch (error) {
    // await client.close()
    console.error("Failed to fetch tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server running and vercel connect properly");
});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
