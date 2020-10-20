const mongoose = require("mongoose");

// TODO:  CHANGE THIS LATER
mongoose.connect(
  "mongodb+srv://6fqHWBUpkD2bvrxY:6fqHWBUpkD2bvrxY@development.oqgrq.mongodb.net/Development?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB connection succeeded.");
    } else {
      console.log(
        "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
      );
    }
  }
);
