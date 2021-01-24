const express = require("express");
const { Vehicule } = require("../db/models/index");

const router = express.Router();

router.get("/vehicules", function (req, res) {
  Vehicule.findAll({
    where: req.query,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/vehicules/:id", function (req, res) {
  const id = req.params.id;
  Vehicule.findByPk(id).then((data) => {
    if (data) res.json(data);
    else {
      res.sendStatus(404);
      
    };
  });
});

router.delete("/vehicules/:id", function (req, res) {
  const id = req.params.id;

  Vehicule.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/vehicules", function (req, res) {
  const post = req.body;
  dateFabrication = new Date(post.dateFabrication)
  if (post.marque === undefined || post.marque === "") {
    res.status(400).json({
      marque: "marque must not be empty",
    });
  } else if (post.model === undefined || post.model === "") {
    res.status(400).json({
      model: "model must not be empty",
    });
  }else if (post.dateFabrication === undefined || post.dateFabrication === "") {
      res.status(400).json({
        model: "La date de fabrication ne peut pas être vide",
      });
  }else if (dateFabrication.getFullYear() < 1981) {
    res.status(400).json({
      dateFabrication: "La date de fabrication ne peut pas être inferieure à 1981",
    });
} else {
    Vehicule.create(req.body).then((data) => res.status(201).json(data));
    res.status(201).json(post);
  }
});

router.put("/vehicules/:id", function (req, res) {
  const id = req.params.id;
  let dateFabrication = new Date(req.body.dateFabrication);
  if (dateFabrication.getFullYear() < 1981) {
    res.status(400).json({
      dateFabrication: "La date de fabrication ne peut pas être inferieure à 1981",
    });
  }
  else
  {
    Vehicule.update(req.body, { where: { id } }).then(([nbUpdated]) => {
      if (req.body.marque !== undefined && post.marque === "") {
        res.status(400).json({
          marque: "marque must not be empty",
        });
      } else if (req.body.model !== undefined && req.body.model === "") {
        res.status(400).json({
          model: "model must not be empty",
        });
      }else if (req.body.dateFabrication !== undefined && req.body.dateFabrication === "") {
          res.status(400).json({
            model: "La date de fabrication ne peut pas être vide",
          });
      }else if (dateFabrication.getFullYear() < 1981) {
        res.status(400).json({
          dateFabrication: "La date de fabrication ne peut pas être inferieure à 1981",
        });
      }else
      {
        if (nbUpdated === 0) res.sendStatus(404);
      
        else
          Vehicule.findByPk(id).then((data) => {
            res.json(data);
          });
      }
      
  });
 
  };
});



module.exports = router;
