const express = require("express");
const employeesController = require("../controllers/employeesController");
const allqueryresults=require('../middleware/allqueryresults')
const router = express.Router();
const Employee=require('../models/EmployeesModel')

router
  .route("/")
  .get(allqueryresults(Employee),employeesController.getAllEmployees)
  .post(employeesController.createEmployees);
 
  router
  .route("/:id")
  .get(employeesController.getEmployee)
  .put(
    employeesController.updateemployee
  )
  .delete(
    employeesController.deleteemployee 
  );

module.exports = router;