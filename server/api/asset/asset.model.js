'use strict';

import mongoose from 'mongoose';

var HighwaySignSchema = new mongoose.Schema({
  signText: { type: String, required: true},   
  image:{ type: String},
  lat: {type: Number, required: true},
  lon: {type: Number, required: true},
  location: {type: String, required: true}
});

var RFIDTagSchema = new mongoose.Schema({
   epcVal : {
        type:String, 
        required: true, 
        unique: true
    }
});

var AssetSchema = new mongoose.Schema({
  data : HighwaySignSchema,
  tag : RFIDTagSchema
});

export default mongoose.model('Asset', AssetSchema);
