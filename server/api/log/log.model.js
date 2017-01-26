'use strict';

import mongoose from 'mongoose';

var HighwaySignLogSchema = new mongoose.Schema({
  lat: {type: Number, required: true},
  lon: {type: Number, required: true},
  signText: { type: String, required: true},
  location: {type: String, required: true},
  date: {type: Date},
  readCount: {type: Number}
});

var RFIDTagSchema = new mongoose.Schema({
   epcVal : {
        type:String, 
        required: true,
        unique: false
    }
});

var LogSchema = new mongoose.Schema({
  tag : RFIDTagSchema,
  logData : HighwaySignLogSchema
});

export default mongoose.model('Log', LogSchema);
