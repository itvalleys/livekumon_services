const CustomerModel = require('../models/Customer.model');

module.exports = {
    async registerCustomer(req, res) {

        let customerRegData = new CustomerModel(req.body);

        customerRegData
            .save((err) => {
                res.status(400).send({
                    status: "Bad Request",
                    message: "Invalid Syntax",
                    result: null,
                });
            })
            .then((val) => {
                res.status(200).send({
                    status: "OK",
                    message: "Customer data inserted Successfully",
                    result: null,
                });
            });

    },

    async details(req, res) {
        CustomerModel.findById(req.body.id)
            .exec()
            .then((doc) => {
                if (doc != null) {
                    res.status(200).send(doc.toJSON());
                } else {
                    res.sendStatus(400);
                }
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    },

    async updateCustomer(req, res) {

        CustomerModel.findByIdAndUpdate(req.body.id, req.body, (err) => {
            res.send(400);
        })
            .then((res) => {
                res.status(200).send({
                    status: "OK",
                    message: "Customer data updated Successfully",
                    result: null,
                });
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });

    }
}