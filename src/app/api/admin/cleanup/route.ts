import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    // 1. Security check (optional but recommended)
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (process.env.CLEANUP_SECRET && secret !== process.env.CLEANUP_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Cloudinary search uses Lucene query format or created_at
    // We want to delete resources with tag 'temp_upload' created more than 7 days ago
    
    const tag = 'temp_upload';
    
    console.log(`Starting cleanup for tag: ${tag} older than 7 days...`);

    // We can use search API to find resources by tag and date
    const searchResult = await cloudinary.search
      .expression(`tags:${tag} AND created_at<=${sevenDaysAgo.toISOString()}`)
      .max_results(100)
      .execute();

    if (searchResult.resources.length === 0) {
      return NextResponse.json({ message: 'No images found for cleanup' });
    }

    const publicIds = searchResult.resources.map((res: any) => res.public_id);
    
    // 3. Delete the resources
    const deleteResult = await cloudinary.api.delete_resources(publicIds);

    return NextResponse.json({
      message: 'Cleanup successful',
      deletedCount: publicIds.length,
      details: deleteResult
    });

  } catch (error) {
    console.error('Cleanup Error:', error);
    return NextResponse.json({ error: 'Cleanup failed', details: error }, { status: 500 });
  }
}
