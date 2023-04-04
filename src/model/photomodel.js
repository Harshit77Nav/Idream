const  mongoose = require("mongoose");

const photoSch = mongoose.Schema({
    label:{type:String},
    imageurl:{type:String},
})

const Pmodel = mongoose.model("photos",photoSch)

module.exports = Pmodel;