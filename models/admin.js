const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  advisorName: {
    type: String,
    required: true,
  },
  advisorPhoto: {
    type: String,
    required: true,
  },
  bookings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      bookingTime: {
        type: String,
        required: true,
      },
      name:{
        type:String
      },
      email:{
        type:String
      }
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Admin = mongoose.model("adminusers", UserSchema);
