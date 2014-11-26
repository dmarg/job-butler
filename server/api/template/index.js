'use strict';

var express = require('express');
var controller = require('./template.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/renderTemplates', auth.isAuthenticated(), controller.render);
router.get('/:id', controller.show);
router.post('/create', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;