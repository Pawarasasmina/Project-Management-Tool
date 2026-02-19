import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { _id: true }
);

const commentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['Todo', 'InProgress', 'Blocked', 'Done'], default: 'Todo', index: true },
    priority: { type: String, enum: ['Low', 'Med', 'High', 'Urgent'], default: 'Med' },
    startDate: { type: Date, default: null },
    dueDate: { type: Date, default: null, index: true },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }],
    watchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    labels: [{ type: String }],
    checklist: [checklistItemSchema],
    comments: [commentSchema],
    attachments: [{ name: String, url: String, size: Number, mimeType: String }],
  },
  { timestamps: true }
);

taskSchema.index({ projectId: 1, status: 1, dueDate: 1 });

export const Task = mongoose.model('Task', taskSchema);
