import mongoose, { Schema, Document } from 'mongoose';

interface TrackingEvent {
  status: 'Pending' | 'Collected' | 'In Transit' | 'Delivered' | 'Delayed';
  timestamp: Date;
}

export interface ISample extends Document {
  sampleId: string;
  hospitalName: string;
  patientName: string;
  status: 'Pending' | 'Collected' | 'In Transit' | 'Delivered' | 'Delayed';
  collectedAt?: Date;
  deliveredAt?: Date;
  agentId: mongoose.Schema.Types.ObjectId;
  tracking: TrackingEvent[];
}

const SampleSchema: Schema = new Schema({
  sampleId: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  patientName: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Collected', 'In Transit', 'Delivered', 'Delayed'],
    default: 'Pending',
  },
  collectedAt: { type: Date },
  deliveredAt: { type: Date },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tracking: [
    {
      status: {
        type: String,
        enum: ['Pending', 'Collected', 'In Transit', 'Delivered', 'Delayed'],
      },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<ISample>('Sample', SampleSchema);
