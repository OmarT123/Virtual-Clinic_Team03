const express = require("express");
const mongoose = require("mongoose");
const schedule = require('node-schedule');
mongoose.set("strictQuery", false);
const cookieParser = require('cookie-parser');
const appointmentModel = require("./Models/Appointment.js")
const VideoChatRoom = require("./Models/VideoChatRoom");


const http = require("http");
const socketIO = require("socket.io");

require("dotenv").config();



const app = express();
const port = process.env.PORT || "8000";
app.use(express.json({ limit: '5000mb' }));
app.use(express.urlencoded({ limit: '5000mb', extended: true }));

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const MongoURI = process.env.MONGO_URI;
if (!MongoURI) {
  console.error("MongoDB URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    server.listen(port, async() => {
      await appointmentModel.cancelPastAppointments();
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

//VideoChat 

app.get('/VideoChatRoom',(req,res)=>{
  res.redirect(`/${uuidV4()}`)
})

app.get('/VideoChatRoom',(req,res)=>{
  res.render('VideoChatRoom',{roomId : req.params.room})
})

io.on('connection',socket=> {
  socket.on('join-room', (roomId,userId)=>{
    console.log(roomId,userId);
  })

})

io.on("connection", (socket) => {
  socket.on("startCall", async ({ patientId, doctorId }) => {
    const roomId = socket.id;
    await VideoChatRoom.create({ roomId, patientId, doctorId });
    io.to(socket.id).emit("roomCreated", { roomId });
  });
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("callEnded", (data) => {
    io.to(data.to).emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      callerName: data.callerName,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});







const {
  addDoctor,
  editDoctor,
  filterAppointmentsForDoctor,
  createAppointment,
  myPatients,
  filterPatientsByAppointments, 
  viewPatient,
  createPrescription,
  exactPatients,
  addAppointmentSlots,
  ViewDoctorWallet,
  viewDoctorAppointments,
  acceptContract,
  rejectContract,
  viewPatientPrescriptions,
  selectPrescriptionDoctor,
  addDosage,
  addToPrescription,
  viewAllMedicines,
  deleteFromPrescription,
  approveRequest
} = require("./Routes/doctorController");


const {
  addPharmacist,
  searchMedicinePharmacist,
  addMedicine,
  editMedicine,
  filterByMedicinalUsePharmacist,
  medicinequantityandsales,
  viewMedicine,
  uploadMedicineImage,
  pharmacistRetrieveNotifications
} = require("./Routes/pharmacistController");

const {
  createFamilyMember,
  searchForDoctorByNameSpeciality,
  filterAppointmentsForPatient,
  getFamilyMembers,
  filterPrescriptionByDateDoctorStatus,
  filterDoctorsSpecialityDate,
  viewMyPrescriptions,
  selectPrescription,
  selectDoctorFromFilterSearch,
  getDoctors,
  linkFamilyMemberAccount,
  viewPatientAppointments,
  buyHealthPackage,
  reserveAppointment,
  getHealthPackageForPatient,
  viewFreeAppointments,
  getAnAppointment,
  uploadHealthRecord,
  getHealthRecords,
  viewMySubscribedHealthPackage,
  CancelSubscription,
  ViewMyWallet,
  viewFreeAppointmentsByName,
  getHealthPackageForFamily,
  searchMedicinePatient,
  filterByMedicinalUsePatient,
  addPatient,
  addToCart,
  viewMyCart,
  removeFromCart,
  decreaseByOne,
  increaseByOne,
  payWithCard,
  payWithWallet,
  sendCheckoutMail,
  getAllAddresses,
  cashOnDelivery,
  pastOrders,
  cancelOrder,
  deleteHealthRecord,
  cancelAppointment,
  addPrescriptionToCart,
  getMedicines,
  getSubMedicines

} = require("./Routes/patientController");


const {
  addAdmin,
  addHealthPackage,
  editHealthPackage,
  deleteHealthPackage,
  viewDocInfo,
  deletePatient,
  deleteDoctor,
  deleteAdmin,
  getAllHealthPackages,
  getHealthPackage ,
  getAllAdmins,
  getAllDoctors,
  getAllPatients,
  acceptDoctor,
  rejectDoctor,
  getADoctor,
  unapprovedPharmacists,
  getPharmacist,
  deletePharmacist,
  filterByMedicinalUseAdmin,
  searchMedicineAdmin,
  getPatient,
  getAllPharmacists,
  viewAllPatients,
  viewAllPharmacists,
  rejectPharmacist,
  acceptPharmacist
} = require("./Routes/adminController.js");


const{ login, logout ,changePassword ,getUserFromTokenMiddleware ,resetPassword, resetPasswordWithOTP,loginAuthentication} =require("./Routes/userController");




//Admin
app.post("/addHealthPackage", getUserFromTokenMiddleware,addHealthPackage);
app.put("/editHealthPackage",getUserFromTokenMiddleware, editHealthPackage);
app.delete("/deleteHealthPackage",getUserFromTokenMiddleware, deleteHealthPackage);
app.get("/viewDocInfo", getUserFromTokenMiddleware,viewDocInfo);
app.delete("/deleteDoctor",getUserFromTokenMiddleware,deleteDoctor);
app.delete("/deleteAdmin",getUserFromTokenMiddleware,deleteAdmin);
app.get("/getAllHealthPackages",getUserFromTokenMiddleware,getAllHealthPackages)
app.get("/getHealthPackage",getUserFromTokenMiddleware,getHealthPackage)
app.get("/getAllAdmins",getUserFromTokenMiddleware,getAllAdmins);
app.get("/getAllDoctors",getUserFromTokenMiddleware,getAllDoctors);
app.put("/acceptDoctor",acceptDoctor);
app.put("/rejectDoctor",rejectDoctor);
app.get("/getADoctor", getADoctor);
app.put("/rejectPharmacist",rejectPharmacist);
app.put("/acceptPharmacist",acceptPharmacist);
app.get("/getUnapprovedPharmacists", getUserFromTokenMiddleware,unapprovedPharmacists);
app.get("/filterByMedicinalUseAdmin", getUserFromTokenMiddleware,filterByMedicinalUseAdmin);
app.delete("/deletePharmacist", getUserFromTokenMiddleware,deletePharmacist);
app.delete("/deletePatient",getUserFromTokenMiddleware, deletePatient);
app.get("/searchMedicineAdmin", getUserFromTokenMiddleware,searchMedicineAdmin);
app.post("/addAdmin", getUserFromTokenMiddleware,addAdmin);
app.get("/getPatient",getUserFromTokenMiddleware ,getPatient);
app.get("/getAllPatients",getUserFromTokenMiddleware,getAllPatients);
app.get("/getAllPharmacists", getUserFromTokenMiddleware,getAllPharmacists);
app.get("/viewAllPatients", getUserFromTokenMiddleware,viewAllPatients);
app.get("/viewAllPharmacists", getUserFromTokenMiddleware,viewAllPharmacists);
app.get("/viewPharmacist", getUserFromTokenMiddleware,getPharmacist);



//Patient
app.post("/addFamilyMember",getUserFromTokenMiddleware, createFamilyMember);
app.get("/searchDoctor",getUserFromTokenMiddleware, searchForDoctorByNameSpeciality);
app.get("/filterAppointmentsForPatient",getUserFromTokenMiddleware, filterAppointmentsForPatient);
app.get("/selectDoctorFromFilterSearch",getUserFromTokenMiddleware,selectDoctorFromFilterSearch);
app.get("/getFamilyMembers",getUserFromTokenMiddleware, getFamilyMembers);
app.get("/filterPrescriptionByDateDoctorStatus",getUserFromTokenMiddleware,filterPrescriptionByDateDoctorStatus);
app.get("/filterDoctorsSpecialityDate", getUserFromTokenMiddleware,filterDoctorsSpecialityDate);
app.get("/viewMyPrescriptions",getUserFromTokenMiddleware,viewMyPrescriptions);
app.get("/selectPrescription",getUserFromTokenMiddleware,selectPrescription);
app.get("/allDoctors",getUserFromTokenMiddleware, getDoctors);
app.get("/viewPatientAppointments", viewPatientAppointments);
app.post("/linkFamilyMember", linkFamilyMemberAccount);
app.get("/viewMySubscribedHealthPackage",getUserFromTokenMiddleware,viewMySubscribedHealthPackage);
app.put("/CancelSubscription",getUserFromTokenMiddleware,CancelSubscription);
app.get("/ViewMyWallet",getUserFromTokenMiddleware,ViewMyWallet)
app.put("/buyHealthPackage",getUserFromTokenMiddleware, buyHealthPackage)
app.put("/reserveAppointment", getUserFromTokenMiddleware,reserveAppointment)
app.get("/sendCheckoutMail", getUserFromTokenMiddleware,sendCheckoutMail)
app.get("/getHealthPackageForPatient", getHealthPackageForPatient)
app.get("/viewFreeAppointments",getUserFromTokenMiddleware, viewFreeAppointments)
app.get("/getAnAppointment", getAnAppointment)
app.put("/uploadHealthRecord",getUserFromTokenMiddleware, uploadHealthRecord);
app.get("/getHealthRecords",getUserFromTokenMiddleware, getHealthRecords);
app.get("/viewFreeAppointmentsByName",getUserFromTokenMiddleware, viewFreeAppointmentsByName)
app.get("/getHealthPackageForFamily",getUserFromTokenMiddleware, getHealthPackageForFamily)
app.get("/searchMedicinePatient",getUserFromTokenMiddleware ,searchMedicinePatient);
app.delete("/removePatient", getUserFromTokenMiddleware,deletePatient);
app.get("/filterByMedicinalUsePatient",getUserFromTokenMiddleware,filterByMedicinalUsePatient);
app.get("/viewMedicine",getUserFromTokenMiddleware,viewMedicine );
app.post("/addPatient", addPatient);
app.post("/addToCart",getUserFromTokenMiddleware,addToCart);
app.get("/viewMyCart",getUserFromTokenMiddleware,viewMyCart);
app.put("/removeFromCart",getUserFromTokenMiddleware,removeFromCart);
app.put("/decreaseByOne",getUserFromTokenMiddleware,decreaseByOne);
app.put("/increaseByOne",getUserFromTokenMiddleware,increaseByOne);
app.get("/payWithCard",getUserFromTokenMiddleware, payWithCard);
app.get("/payWithWallet",getUserFromTokenMiddleware, payWithWallet);
app.get("/sendCheckoutMail", getUserFromTokenMiddleware,sendCheckoutMail);
app.get("/getAllAddresses",getUserFromTokenMiddleware ,getAllAddresses);
app.get("/cashOnDelivery",getUserFromTokenMiddleware, cashOnDelivery);
app.get("/pastOrders",getUserFromTokenMiddleware,pastOrders);
app.put("/cancelOrder",getUserFromTokenMiddleware,cancelOrder);
app.put("/deleteHealthRecord", getUserFromTokenMiddleware, deleteHealthRecord);
app.put("/cancelAppointment", getUserFromTokenMiddleware, cancelAppointment);
app.post("/addPrescriptionToCart", getUserFromTokenMiddleware, addPrescriptionToCart);
app.get("/getMedicines",getMedicines)
app.get("/getSubMedicines",getSubMedicines)

//Doctor
app.get("/filterAppointmentsForDoctor",getUserFromTokenMiddleware ,filterAppointmentsForDoctor);
app.post("/addAppointment",getUserFromTokenMiddleware,createAppointment);
app.post("/addDoctor", addDoctor);
app.put("/editDoctor",getUserFromTokenMiddleware, editDoctor);
app.get("/viewmypatients",getUserFromTokenMiddleware, myPatients);
app.get("/viewDocInfo", getUserFromTokenMiddleware,viewDocInfo);
app.get("/filterPatientsByAppointments",getUserFromTokenMiddleware, filterPatientsByAppointments);
app.get("/viewPatient", getUserFromTokenMiddleware,viewPatient);
app.get("/viewmypatientsbyname",getUserFromTokenMiddleware,exactPatients);
app.post("/createPrescription",getUserFromTokenMiddleware,createPrescription);
app.get("/viewDoctorAppointments", getUserFromTokenMiddleware, viewDoctorAppointments); 
app.post("/addAppointmentSlots",getUserFromTokenMiddleware, addAppointmentSlots);
app.get("/ViewDoctorWallet",getUserFromTokenMiddleware,ViewDoctorWallet);
app.put("/acceptContract", getUserFromTokenMiddleware, acceptContract);
app.put("/rejectContract", getUserFromTokenMiddleware, rejectContract);
app.get("/viewPatientPrescriptions",getUserFromTokenMiddleware,viewPatientPrescriptions);
app.get("/selectPrescriptionDoctor",getUserFromTokenMiddleware,selectPrescriptionDoctor);
app.put("/addDosage",addDosage);
app.post("/addToPrescription",getUserFromTokenMiddleware,addToPrescription);
app.get("/viewAllMedicines",getUserFromTokenMiddleware,viewAllMedicines);
app.post("/deleteFromPrescription",getUserFromTokenMiddleware,deleteFromPrescription)
app.put("/approveRequest", getUserFromTokenMiddleware, approveRequest);

//Pharmacist
app.post("/addPharmacist",addPharmacist);
app.get("/searchMedicinePharmacist", getUserFromTokenMiddleware,searchMedicinePharmacist);
app.get("/viewAPharmacist",getUserFromTokenMiddleware, getPharmacist);
app.put("/editMedicine",getUserFromTokenMiddleware, editMedicine);
app.post("/addMedicine", getUserFromTokenMiddleware,addMedicine);
app.get("/filterByMedicinalUsePharmacist",getUserFromTokenMiddleware, filterByMedicinalUsePharmacist);
app.get("/medicinequantityandsales",getUserFromTokenMiddleware, medicinequantityandsales);
app.put("/uploadMedicineImage", uploadMedicineImage);
app.get("/pharmacistRetrieveNotifications", pharmacistRetrieveNotifications);

//user 

app.post('/login', login);
app.get('/logout',getUserFromTokenMiddleware,logout);
app.get('/getUserFromTokenMiddleware',getUserFromTokenMiddleware);
app.put('/changePassword', getUserFromTokenMiddleware, changePassword);
app.put('/resetPassword', resetPassword);
app.put('/resetPasswordWithOTP',resetPasswordWithOTP);
app.get('/loginAuthentication',loginAuthentication);


