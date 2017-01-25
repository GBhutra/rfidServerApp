/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/assets              ->  index
 * GET     /api/assets/loc          ->  index of locations
 * GET     /api/assets/nums         ->  number of tagged, untagged and total assets
 * POST    /api/assets              ->  create
 * GET     /api/assets/:id          ->  show
 * PUT     /api/assets/:id          ->  upsert
 * PATCH   /api/assets/:id          ->  patch
 * DELETE  /api/assets/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Asset from './asset.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Assets
export function index(req, res) {
  return Asset.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Locations
export function locationIndex(req, res) {
  return Asset.distinct("data.location").exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets the number of tagged, untagged and total assets
export function numbers(req, res) {
  return Asset.count().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Asset from the DB
export function show(req, res) {
  return Asset.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Asset belonging to the same location from the DB
export function locationAssetIndex(req, res) {
  return Asset.find({"data.location":req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Asset in the DB
export function create(req, res) {
  return Asset.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Asset in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Asset.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Asset in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Asset.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Asset from the DB
export function destroy(req, res) {
  return Asset.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
