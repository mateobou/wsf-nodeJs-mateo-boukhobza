const express = require("express");
const { createPool } = require("mysql2/promise");
const { Owner, db } = require("../db/models/index");

const router = express.Router();


router.get("/owner", function (req, res) {
    Owner.findAll({
      where: req.query,
    }).then((data) => {
      res.json(data);
    });
  });
  
  router.get("/owner/:id", function (req, res) {
    const id = req.params.id;
    Owner.findByPk(id).then((data) => {
      if (data) res.json(data);
      else {
        res.sendStatus(404);
        
      };
    });
  });

router.get("/owner/:id", function (req, res) {
  const id = req.params.id;
  Owner.findByPk(id).then((data) => {
    if (data) res.json(data);
    else {
      res.sendStatus(404);
      
    };
  });
});

router.delete("/owner/:id", function (req, res) {
  const id = req.params.id;

  Owner.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/owner", function (req, res) {
  const post = req.body;
  const date = new Date();
  const year = date.getFullYear()
  birthday = new Date(post.birthday).getFullYear();
  if (post.firstname === undefined || post.firstname === "") {
    res.status(400).json({
        firstname: "firstname must not be empty",
    });
  } else if (post.lastname === undefined || post.lastname === "") {
    res.status(400).json({
        proprietaire: "lastname must not be empty",
    });
  } else if (post.birthday === undefined || post.birthday === "") {
    res.status(400).json({
        birthday: 'birthday must not be empty',
  });
} else if (year - birthday <= 18) {
  res.status(400).json({
      birthday: 'birthday must be > to 18',
});
  } else if (post.licenseType !== "voiture" && post.licenseType !== "avion" && post.licenseType !== "bateau" && post.licenseType !== undefined && post.licenseType !== "") {
    res.status(400).json({
      licenseType: "le type de licence doit soit être avion, bateau ou voiture, elle ne peut pas être nulle",
  });
  } else {
    Owner.create(req.body).then((data) => res.status(201).json(data));
    res.status(201).json(post);
  }
});

router.put("/owner/:id", function (req, res) {
  const id = req.params.id;
  const date = new Date();
  const year = date.getFullYear()
  const birthday = new Date(req.body.birthday)
  const post = req.params;
  console.log("birthday : "+ req.body.birthday)
  
    Owner.update(req.body, { where: { id } }).then(([nbUpdated]) => {
      if (req.body.firstname !== undefined && req.body.firstname === "") {
        res.status(400).json({
            firstname: "firstname must not be empty",
        });
      } else if (req.body.lastname !== undefined && req.body.lastname === "") {
        res.status(400).json({
            proprietaire: "lastname must not be empty",
        });
      } else if (req.body.birthday !== undefined && req.body.birthday === "") {
        res.status(400).json({
            birthday: 'birthday must not be empty',
      });
    } else if (req.body.birthday !== undefined && year - birthday <= 18) {
      console.log('birthday');
      res.status(400).json({
          birthday: 'birthday must be > to 18',
    });
      } else if (req.body.licenseType !== "voiture" && req.body.licenseType !== "avion" && req.body.licenseType !== "bateau" && req.body.licenseType !== undefined && req.body.licenseType !== "") {
        res.status(400).json({
          licenseType: "le type de licence doit soit être avion, bateau ou voiture, elle ne peut pas être nulle",
      });
      }else
      {
        if (nbUpdated === 0) {res.sendStatus(404); 
        }else
          {
            Owner.findByPk(id).then((data) => {
              res.json(data);
            });
          }
      }

      
  });
  
    

});

module.exports = router;
