'use strict';

import mongoose from 'mongoose';
/*
var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);
*/

var SongsSchema = new moongoose.Schema({
	name: String,
	singer: String,
	Album: String,
	Genre: String,
	release_date: Date
	});

var songs = moongoose.model('songs' , SongsSchema);
module.exports = songs;

var SingerSchema = new moongoose.Schema({
	name: String,
	songs: Array,
	Movie: String,
	Genre: String,
	release_date: Date
	});

var singer = moongoose.model('singer' , SingerSchema);
module.exports = singer;
