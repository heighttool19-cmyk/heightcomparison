import mongoose from 'mongoose';

const ShareSchema = new mongoose.Schema({
  // A clean, short ID for the URL (e.g., "ab-xyz-99")
  shortId: { type: String, required: true, unique: true },

  // The actual chart data (short keys: u, z, p)
  data: { type: mongoose.Schema.Types.Mixed, required: true },

  // Hashed version of the data for quick duplicate detection
  dataHash: { type: String, required: true, index: true },

  // MAGIC TRICK: MongoDB will automatically delete this document after 21 days (1814400 seconds)
  createdAt: { type: Date, default: Date.now, expires: '21d' }
});

export default mongoose.models.Share || mongoose.model('Share', ShareSchema);
