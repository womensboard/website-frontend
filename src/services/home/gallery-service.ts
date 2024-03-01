import { GalleryInput } from '@/components/organism/forms/home/edit-gallery-form';
import { apiHTTPClient } from 'lib/http-requester';

export class GalleryService {
  static async fetchGallery() {
    const res = apiHTTPClient.get('/gallery');

    return res;
  }

  static async createGallery(input: GalleryInput) {
    const res = await apiHTTPClient.post('/gallery', {
      ...input,
    });

    return res;
  }
}
