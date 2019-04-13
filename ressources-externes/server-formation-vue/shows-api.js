/**
 * Rules API.
 * GET /rest/shows
 * GET /rest/shows/:is
 * POST /rest/shows/:id/favorites
 */

const _ = require('lodash');
const shows = require('./shows');

module.exports = function showsRouter(app) {
  app.get('/rest/shows', (req, res) => {
    console.info('GET /rest/shows');
    return res.status(200).json(shows);
  });

  app.get('/rest/shows/:id', (req, res) => {
    console.info(`GET /rest/shows/${req.params.id}`);

    const paramId = Number(req.params.id);
    const show = _.find(shows, r => r.id === paramId);

    if (!show) {
      return res.status(404).send();
    }
    return res.status(200).json(show);
  });

  app.post('/rest/shows/:id/favorites', (req, res) => {
    console.info(`POST /rest/shows/${req.params.id}/favorites`);
    console.info('  => body: ', req.body);
    
    const paramId = Number(req.params.id);
    const show = _.find(shows, r => r.id === paramId);

    if (!show) {
      return res.status(404).send();
    }

    const body = req.body;
    
    if (!body || body.isFavorites === undefined) {
      return res.status(400).send();
    }

    _.extend(show, body)    

    return res.status(200).json(show);

  });

};