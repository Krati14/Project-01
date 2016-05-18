'use strict';

var BandSchema = new moongoose.Schema({
	name: String,
	songs: Array,
	Genre: String,
	release_date: Date
	});

var band = moongoose.model('band' , BandSchema);
module.exports = band;
