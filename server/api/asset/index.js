'use strict';

import {Router} from 'express';
import * as controller from './asset.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/loc', auth.isAuthenticated(),controller.locationIndex);
router.get('/nums', auth.isAuthenticated(),controller.numbers);
router.get('/loc/:id', auth.isAuthenticated(),controller.locationAssetIndex);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
router.put('/:id', auth.isAuthenticated(),controller.upsert);
router.patch('/:id', auth.isAuthenticated(),controller.patch);
router.delete('/:id', auth.isAuthenticated(),controller.destroy);

module.exports = router;
