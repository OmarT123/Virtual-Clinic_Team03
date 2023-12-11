const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      uniqure : true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: {
        name: String,
        mobileNumber: String,
        relation: String,
      },
      required: true,
    },
    familyMembers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "FamilyMember",
      },
    ],
    HealthRecords: [
      { 
        type: String,
      }
    ],
    healthPackage:{
      type: {
        healthPackageID: {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'HealthPackage',
        },
        status: String,
        endDate: Date,
      },
    },
    wallet: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;