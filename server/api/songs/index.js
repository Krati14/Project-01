'use strict';

//var express = require('express');
//var controller = require('./thing.controller');
var songs_controller = require ('./songs.controller');
//var band_controller = require('./band.controller');
//var singer_controller = require('./singer.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
