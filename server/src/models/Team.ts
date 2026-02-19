import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
    projectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', teamSchema);
