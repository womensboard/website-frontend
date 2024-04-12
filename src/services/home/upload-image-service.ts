import { API_BASE_URL } from 'config/constants';

export class UploadImageService {
  static async uploadImage(token: string, file: File) {
    const res = await fetch(
      `${API_BASE_URL}/api/images/generate-presigned-image-url`,
      {
        method: 'POST',
        body: JSON.stringify({ filename: file.name }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await res.json();
    const signedUploadURL = resData.url;

    await fetch(signedUploadURL, {
      method: 'PUT',
      body: file,
    });
    return signedUploadURL.split('?')[0] as string;
  }
}
