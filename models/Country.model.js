const mongoose = require('mongoose');

var CountrySchema = new mongoose.Schema({
    id: {
        type: String,

    },
    countryDesc: {
        type: String,
    },
    countryName: {
        type: String,
    },
    countryStatus: {
        type: String,
    },

});

module.exports = mongoose.model('Country', CountrySchema);
