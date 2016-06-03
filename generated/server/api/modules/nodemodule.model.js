'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	repoUrl: {
		type: String
	}
});

let NodeModule = mongoose.model('Nodemodule', schema);

module.exports = NodeModule;