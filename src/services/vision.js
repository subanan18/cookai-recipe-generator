import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY;

async function toBase64(uri) {
  if (Platform.OS !== 'web') {
    return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  }

  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.readAsDataURL(blob);
  });
}

export async function detectLabels(imageUris) {
  if (!apiKey) throw new Error('Missing EXPO_PUBLIC_GOOGLE_VISION_API_KEY');

  const labels = [];
  for (const uri of imageUris) {
    const content = await toBase64(uri);
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      { requests: [{ image: { content }, features: [{ type: 'LABEL_DETECTION', maxResults: 8 }] }] },
    );
    labels.push(...(response.data.responses?.[0]?.labelAnnotations ?? []));
  }
  return labels;
}
