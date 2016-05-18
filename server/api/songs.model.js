'use strict';

import mongoose from 'mongoose';

var SongsSchema = new moongoose.Schema({
	name: String,
	singer: String,
	Album: String,
	Genre: String,
	rating: String,
	release_date: Date
	});

var songs = moongoose.model('songs' , SongsSchema);
module.exports = songs;

