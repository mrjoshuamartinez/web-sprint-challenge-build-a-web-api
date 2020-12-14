// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const project = require('./projects-model');


router.get('/', (req, res) => {
  project.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message })
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  project.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    });
});


router.post('/', (req, res) => {
  if(!req.body.name || !req.body.description){
      res.status(400).json({ errorMessage: 'Missing required field'})
  }
  project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body
  if(!req.body.name || !req.body.description){
    res.status(400).json({ error: 'Missing required field'})
  }

  project.update(id, changes)
    .then(project => {
    res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
    res.status(500).json({ error: err.message })
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params
  project.remove(id)
  .then(project => {
  console.log(project)
  res.status(200).json({ message: "Project deleted"})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Project could not be deleted'})
  });
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params
  project.getProjectActions(id)
    .then(project => {
      if(project){
          res.status(200).json(project)
      }
      else{
          res.status(404).json({ error: 'Could not find the action' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    });
});

module.exports = router;