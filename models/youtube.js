const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const idSchema = new Schema({
  kind: {
    type: String,
    required: true
  },
  channelId: {
    type: String
  },
  videoId: {
    type: String
  }
});

const itemSchema = new Schema({
  kind: {
    type: String,
    required: true
  },
  etag: {
    type: String,
    required: true
  },
  id: [idSchema]
});

const youtubeSchema = new Schema({
  kind: {
    type: String,
    required: true
  },
  etag: {
    type: String,
    required: true
  },
  nextPageToken: {
    type: String
  },
  regionCode: {
    type: String,
    required: true
  },
  pageInfo: {
    totalResults: {
      type: Number,
      required: true
    },
    resultsPerPage: {
      type: Number,
      required: true
    }
  },
  items: [itemSchema]
}, { timestamps: true });

const Youtube = mongoose.model('Youtube', youtubeSchema);

module.exports = Youtube;