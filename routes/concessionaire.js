const express = require("express");
const { Concessionaire, db } = require("../db/models/index");

const router = express.Router();

router.get("/concessionaires", function (req, res) {
  Concessionaire.findAll({
    where: req.query,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/concessionaires/:id", function (req, res) {
  const id = req.params.id;
  Concessionaire.findByPk(id).then((data) => {
    if (data) res.json(data);
    else {
      res.sendStatus(404);
      
    };
  });
});

router.delete("/concessionaires/:id", function (req, res) {
  const id = req.params.id;

  Concessionaire.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/concessionaires", function (req, res) {
  const post = req.body;
  if (post.address === undefined || post.address === "") {
    res.status(400).json({
        address: "address must not be empty",
    });
  } else if (post.proprietaire === undefined || post.proprietaire === "") {
    res.status(400).json({
        proprietaire: "proprietaire must not be empty",
    });
  } else if (post.open === undefined || post.open === "") {
    res.status(400).json({
      open: true,
  });
  } else if (post.open !== true && post.open !== false && post.open !== undefined && post.open !== "") {
    res.status(400).json({
      open: "Vous ne pouvez qu'être open (true) ou close (false)",
  });
  } else {
    Concessionaire.create(req.body).then((data) => res.status(201).json(data));
    res.status(201).json(post);
  }
});

router.put("/concessionaires/:id", function (req, res) {
  const id = req.params.id;

  Concessionaire.update(req.body, { where: { id } }).then(([nbUpdated]) => {
    if (nbUpdated === 0) res.sendStatus(404);
    else
    Concessionaire.findByPk(id).then((data) => {
        res.json(data);
      });
  });
});


console.log("db------------")
console.log(db)
module.exports = router;
