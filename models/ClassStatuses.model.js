const mongoose = require('mongoose');

var ClassStatusSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    classStatusDesc: {
        type: String,
    },
    classStatusName: {
        type: String,
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('ClassStatu', ClassStatusSchema);

