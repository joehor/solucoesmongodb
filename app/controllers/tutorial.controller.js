const db = require("../models");
const Tutorial = db.tutorials;

// default CRUD operations
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ success: false, message: "Conteúdo não pode ser vazio" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocorreu um erro ao criar o registro"
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      if (data.length==0) {
        res.status(200).send({
          success: false,
          message: `Registro não encontrado com [${title}]`
        });  
      } else {
        res.send(data);
      }
    })
    .catch(err => {
    res.status(500).send({
        success: false,
        message:
        err.message || "Ocorreu um erro ao recuperar o registro"
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ success: false, message: "Registro não encontrado" });
    else res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ success: false, message: "Ocorreu um erro ao recuperar o registro" });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
        success: false,
        message: "O registro não pode ser vazio"
    });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({
        success: false,
            message: "O registro não foi pode ser atualizado. Verifique se ele existe"
        });
        } else res.send({ success: true, message: "Registro atualizado com sucesso" });
    })
    .catch(err => {
        res.status(500).send({
        success: false,
        message: "Erro ao atualizar o registro"
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndDelete(id)
    .then(data => {
    if (!data) {
        res.status(404).send({
        success: false,
        message: "O registro não pode ser deletado. Verifique se ele existe"
        });
    } else {
        res.send({
        success: true,
        message: "Registro deletado com sucesso"
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        success: false,
        message: "Registro não pode ser deletado"
    });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
        success: true,
        message: `${data.deletedCount} registros deletados com sucesso`,
        rowseffect: data.deletedCount
        });
    })
    .catch(err => {
        res.status(500).send({
        success: false,
        message:
        err.message || "Ocorreu um erro ao deletar todos os registros"
        });
    });
};
// FIM - default CRUD operations

// Specific model operations
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocorreu um erro ao buscar os registros publicados"
      });
    });
};