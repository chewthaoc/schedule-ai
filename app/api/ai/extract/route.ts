import { NextRequest, NextResponse } from 'next/server';
import { openai, getModelName } from '@/lib/openai/client';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    console.log('Original imageUrl:', imageUrl);

    // Fetch the image and convert to base64
    // Use the original URL directly - Supabase Storage URLs should work
    let imageResponse;
    try {
      imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        console.error('Failed to fetch image:', imageResponse.status, imageResponse.statusText);
        throw new Error(`Failed to fetch image: ${imageResponse.status}`);
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      throw new Error('Failed to fetch image from storage');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    console.log('Image converted to base64, size:', base64Image.length, 'mime:', mimeType);

    const response = await openai.chat.completions.create({
      model: getModelName(),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this schedule/timetable image and extract all events. For each event, provide:
- title: Event name
- description: Additional details
- location: Room/venue
- startTime: Start time (ISO format)
- endTime: End time (ISO format)
- dayOfWeek: Day (0=Sunday, 6=Saturday)
- category: Event type/subject

Return ONLY valid JSON array format: [{"title":"...","description":"...","location":"...","startTime":"...","endTime":"...","dayOfWeek":0,"category":"..."}]`,
            },
            {
              type: 'image_url',
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const events = JSON.parse(content);

    return NextResponse.json({ events });
  } catch (error) {
    console.error('AI extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract events from image' },
      { status: 500 }
    );
  }
}
