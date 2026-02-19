import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    inChargeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, enum: ['Active', 'OnHold', 'Completed'], default: 'Active', index: true },
    startDate: { type: Date, default: null },
    dueDate: { type: Date, default: null },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
