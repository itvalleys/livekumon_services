const mongoose = require('mongoose');

var TimeZoneSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    timeZoneDesc: {
        type: String,
    },
    timeZoneName: {
        type: String,
    },
    timeZoneStatus: {
        type: String,
    },

});

module.exports = mongoose.model('timeZone', TimeZoneSchema);
