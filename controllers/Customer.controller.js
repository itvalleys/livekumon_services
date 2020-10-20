const CustomerModel = require("../models/Customer.model");

module.exports = {
  registerCustomer(req, res) {
    let customerRegData = new CustomerModel(req.body);
    customerRegData
      .save()
      .then((data) => {
        res.status(200).send({
          status: "OK",
          message: "Customer data inserted Successfully",
          result: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  details(req, res) {
    if (req.body.id == null) {
      res.status(400).send({
        status: "Bad Request",
        message: "Missing ID",
        result: null,
      });
    }

    CustomerModel.findOne({ id: req.body.id }).then((data) => {
      res.sendStatus(200).send({
        status: "OK",
        message: "Data Fetched Successfully",
        result: data,
      });
    });
  },

  updateCustomer(req, res) {
    if (req.body.id == null) {
      res.status(400).send({
        status: "Bad Request",
        message: "Missing ID",
        result: null,
      });
    }

    CustomerModel.updateOne({ id: req.body.id }, req.body)
      .exec()
      .then((data) => {
        res.sendStatus(200).send({
          status: "OK",
          message: "Updated Successfully",
          result: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(500);
      });
  },
};
