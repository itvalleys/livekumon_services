var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/admin.controller')
var customerCtrl = require('../controllers/Customer.controller')

/* GET home page. */



router.post('/adminlogin', ctrl.authentication);

router.post('/PasswordConfirm', ctrl.PasswordConfirm);
router.post('/ChangePassword', ctrl.ChangePassword);

router.post('/register', ctrl.register)

router.post("/customer/registerCustomer", customerCtrl.registerCustomer);
router.post("/customer/details", customerCtrl.details);
router.post("/customer/updateCustomer", customerCtrl.updateCustomer);


module.exports = router;
