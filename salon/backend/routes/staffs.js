const router = require("express").Router();
let Staffs = require("../models/staff");
let Attendance = require("../models/attendance");

router.route("/add").post((req, res) => {
  console.log("fired");

  //Insert
  const EmpId = Number(req.body.EmpId);
  const name = req.body.name;
  const EmpStatus = req.body.EmpStatus;
  const dateOfBirth = req.body.dateOfBirth;
  
  const nic = req.body.nic;
  const contact = req.body.contact;
  const email = req.body.email;
  const address = req.body.address;

  const newStaff = new Staffs({
    EmpId,
    name,
    EmpStatus,
    dateOfBirth,
   
    nic,
    contact,
    email,
    address,
  });

  newStaff
    .save()
    .then(() => {
      res.json("Employee Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//view all
router.route("/").get((req, res) => {
  console.log("get all");
  Staffs.find()
    .then((staffs) => {
      res.json(staffs);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;

  //D structure
  const { name, dateOfBirth, nic, contact, email, address } = req.body;

  const updateEmp = {
    name,
    dateOfBirth,
   
    nic,
    contact,
    email,
    address,
  };

  const update = await Staffs.findByIdAndUpdate(userId, updateEmp)
    .then(() => {
      res.status(200).send({ status: "Employee updated" /*emp: update*/ });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//Delete
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  await Staffs.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "User delete" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(200)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  console.log("user", userId);
  const userRes = await Staffs.findById(userId)
    .then((user) => {
      res.status(200).send({ status: "User fetched", user });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

router.route("/addAtt").post((req, res) => {
  console.log("fired");
  
  //Insert
  const EmpId = Number(req.body.EmpId);
  const workedHours = req.body.workedHours;
  const  month = req.body. month;
  const hourlyWage = req.body.hourlyWage;

  const newStaff = new Attendance({
    EmpId,
    workedHours,
    month,
    hourlyWage,
  });

  newStaff
    .save()
    .then(() => {
      res.json("Attendance Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;