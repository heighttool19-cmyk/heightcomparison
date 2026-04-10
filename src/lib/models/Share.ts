import mongoose from 'mongoose';

const ShareSchema = new mongoose.Schema({
  // A clean, short ID for the URL (e.g., "ab-xyz-99")
  shortId: { type: String, required: true, unique: true },
  
  // The actual chart data you are currently compressing
  data: {
    unitSystem: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
    zoom: { type: Number, default: 1 },
    persons: { type: Array, default: [] } // This array will contain the Cloudinary URLs!
  },

  // Hashed version of the data for quick duplicate detection
  dataHash: { type: String, required: true, index: true },

  // MAGIC TRICK: MongoDB will automatically delete this document after 21 days (1814400 seconds)
  createdAt: { type: Date, default: Date.now, expires: '21d' }
});

export default mongoose.models.Share || mongoose.model('Share', ShareSchema);
