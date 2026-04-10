import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Share from '@/lib/models/Share';
import { nanoid } from 'nanoid';
import crypto from 'node:crypto';

// POST: Save a new chart to MongoDB
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { data } = body;

    if (!data) return NextResponse.json({ error: 'Data required' }, { status: 400 });

    // 1. Create a stable hash of the data to detect duplicates
    const dataString = JSON.stringify(data);
    const dataHash = crypto.createHash('sha256').update(dataString).digest('hex');

    // 2. Check if this exact chart already exists
    const existingShare = await Share.findOne({ dataHash });
    
    if (existingShare) {
      // Refresh the TTL by updating the createdAt timestamp
      existingShare.createdAt = new Date();
      await existingShare.save();
      return NextResponse.json({ shortId: existingShare.shortId, reused: true });
    }

    // 3. Generate a new short 8-character ID if not found
    const shortId = nanoid(8); 

    const newShare = await Share.create({
      shortId,
      data,
      dataHash
    });

    return NextResponse.json({ shortId: newShare.shortId, reused: false });
  } catch (error) {
    console.error('Error in POST /api/share:', error);
    return NextResponse.json({ error: 'Failed to save chart' }, { status: 500 });
  }
}

// GET: Retrieve a chart by ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await connectToDatabase();
    const shareDoc = await Share.findOne({ shortId: id });

    if (!shareDoc) return NextResponse.json({ error: 'Chart not found or expired' }, { status: 404 });

    return NextResponse.json(shareDoc.data);
  } catch (error) {
    console.error('Error in GET /api/share:', error);
    return NextResponse.json({ error: 'Failed to fetch chart' }, { status: 500 });
  }
}
