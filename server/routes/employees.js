const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// POST create employee
router.post("/", async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
