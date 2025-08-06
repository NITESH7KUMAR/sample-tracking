import mongoose from "mongoose";

const SampleSchema = new mongoose.Schema({
  sampleId: {
    type: String,
    required: true,
    unique: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Collected", "In Transit", "Delivered"],
    default: "Pending",
  },
  collectedAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
});

export default mongoose.model("Sample", SampleSchema);
