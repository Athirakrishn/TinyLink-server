const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true
  },
  totalClicks: {
     type: Number, 
     default: 0 },
  lastClicked: {
     type: Date, 
    default: null 
  },
  createdAt: 
  { 
    type: Date, 
    default: Date.now 
  }
}) 
const links = new mongoose.model("links",linkSchema)
module.exports=links