import { createBrowserClient } from './browser-client';

export async function uploadScheduleImage(file: File, userId: string): Promise<string> {
  const supabase = createBrowserClient();

  // Generate unique filename with safe extension
  const timestamp = Date.now();
  // Get file extension from MIME type to avoid encoding issues
  const mimeType = file.type;
  let fileExt = 'jpg'; // default
  if (mimeType === 'image/png') fileExt = 'png';
  else if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') fileExt = 'jpg';
  else if (mimeType === 'image/gif') fileExt = 'gif';
  else if (mimeType === 'image/webp') fileExt = 'webp';

  const fileName = `${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('schedule-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('schedule-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const supabase = createBrowserClient();

  // Generate unique filename with safe extension
  const mimeType = file.type;
  let fileExt = 'jpg'; // default
  if (mimeType === 'image/png') fileExt = 'png';
  else if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') fileExt = 'jpg';
  else if (mimeType === 'image/gif') fileExt = 'gif';
  else if (mimeType === 'image/webp') fileExt = 'webp';

  const fileName = `avatar.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload file to Supabase Storage (upsert to replace existing)
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, // Replace existing avatar
    });

  if (error) {
    throw new Error(`Failed to upload avatar: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteScheduleImage(imageUrl: string, userId: string): Promise<void> {
  const supabase = createBrowserClient();

  // Extract file path from URL
  const urlParts = imageUrl.split('/schedule-images/');
  if (urlParts.length < 2) {
    throw new Error('Invalid image URL');
  }

  const filePath = urlParts[1];

  // Verify the file belongs to the user
  if (!filePath.startsWith(userId)) {
    throw new Error('Unauthorized to delete this image');
  }

  const { error } = await supabase.storage
    .from('schedule-images')
    .remove([filePath]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}
