const express = require("express");
const leaveManagementController = require("../controllers/leaveManagementController");
const allqueryresults = require("../middleware/allqueryresults");
const LeaveManagement = require("../models/LeaveManagementModel");
const authController = require("../controllers/authController");
const {
  checkEmployeeLeaveAccess,
} = require("../middleware/checkEmployeeAccess");

const router = express.Router();

router
  .route("/")
  .get(
    allqueryresults(LeaveManagement, {
      path: "employee",
      select: "employee_name",
    }),
    authController.protect,
    authController.restrictTo("admin"),
    leaveManagementController.getAllLeaves
  )
  .post(
    authController.protect,
    authController.restrictTo("employee"),
    leaveManagementController.createLeaves
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "employee"),
    checkEmployeeLeaveAccess(LeaveManagement),
    leaveManagementController.getLeaves
  )
  .put(
    authController.protect,
    authController.restrictTo("admin", "employee"),
    checkEmployeeLeaveAccess(LeaveManagement),
    leaveManagementController.updateLeaves
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "employee"),
    checkEmployeeLeaveAccess(LeaveManagement),
    leaveManagementController.deleteLeaves
  );
router
  .route("/status/:id")
  .put(
    authController.protect,
    authController.restrictTo("admin"),
    leaveManagementController.approveStatus
  );

module.exports = router;
