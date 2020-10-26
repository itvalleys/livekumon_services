const mongoose = require('mongoose');

var TeacherSchema = new mongoose.Schema({
    id: {
        type: String,

    },
    TeacherDesc: {
        type: String,
    },
    TeacherName: {
        type: String,
    },
    TeacherStatus: {
        type: String,
    },

});

module.exports = mongoose.model('Teacher', TeacherSchema);
