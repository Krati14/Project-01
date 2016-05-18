'use strict';

import mongoose from 'mongoose';

var SingerSchema = new moongoose.Schema({
	name: String,
	songs: Array,
	Movie: String,
	Genre: String,
	release_date: Date
	});

var singer = moongoose.model('singer' , SingerSchema);
module.exports = singer;

