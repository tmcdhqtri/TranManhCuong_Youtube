const express = require('express');
const bodyParser = require('body-parser');
const Youtube = require('../models/youtube');

const youtubeRouter = express.Router();
youtubeRouter.use(bodyParser.json());

youtubeRouter.route('/')
  .get((req, res, next) => {
    Youtube.find({})
      .then((youtubes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtubes);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Youtube.create(req.body)
      .then((youtube) => {
        console.log('Youtube Created', youtube);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtube);
      })
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /youtubes');
  })
  .delete((req, res, next) => {
    Youtube.deleteMany({})
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch((err) => next(err));
  });

youtubeRouter.route('/:youtubeId')
  .get((req, res, next) => {
    Youtube.findById(req.params.youtubeId)
      .then((youtube) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtube);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /youtubes/' + req.params.youtubeId);
  })
  .put((req, res, next) => {
    Youtube.findByIdAndUpdate(req.params.youtubeId, {
      $set: req.body
    }, { new: true })
      .then((youtube) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(youtube);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Youtube.findByIdAndRemove(req.params.youtubeId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = youtubeRouter;