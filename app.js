const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const { User } = require("./models/User");


app.get("/users", async (req, res) => {
    const users = await User.findAll({});
    res.status(200).json({
      data: users,
    });
  });



app.get("/users/:id", async (req, res) => {
    const users = await User.findByPk(req.params.id);
    res.status(200).json({
      data: users,
    });
  });



app.get("/users/:city", async (req, res) => {
    const users = await User.findAll({
      where: {
        city: req.params.city
      },
    });
    res.status(200).json({
      data: users,
    });
  });



app.post("/users", async (req, res) => {
    try {
      const users = await User.create(req.body);
      await users.reload();
      res.status(201).json(users);
    } catch (e) {
      return res.json(e);
    }
  });



app.patch("/users/:id", async (req, res) => {
    try {
      const users = await User.findByPk(req.params.id);
      if (users) {
        users.first_name = req.body.first_name;
        users.last_name = req.body.Last_name;
      }
  
      await users.save();
  
      res.status(200).json({ users });
    } catch (e) {
      return res.json(e);
    }
  });



app.delete("/users/:id", async (req, res) => {
    try {
      const users = await User.findByPk(req.params.id);
      await users.destroy();
      res.status(204).json({});
    } catch (e) {
      return res.json(e);
    }
  });


app.listen(port, async () => {
  try {
    await User.sync({
      alert: true,
      force: false,
    });
  } catch (error) {
    console.error(error);
  }
});
