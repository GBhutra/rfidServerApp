'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  friendlyname: {
    type: String,
    default: "Thing"
  },
  macAddress: {
    type: String,
    unique: true,
    required: true,
  },
  ipAddress: String,
  info : String,
  active: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Thing', ThingSchema);
