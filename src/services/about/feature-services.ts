import { AboutFeatureItem } from 'entities/about';
import { apiHTTPClient } from 'lib/http-requester';

export class FeatureService {
  static async updateFeatures(input: AboutFeatureItem[]) {
    const res = await apiHTTPClient.put('/about-feature', input);

    return res;
  }

  static async fetchAllFeatures() {
    const res = await apiHTTPClient.get<AboutFeatureItem[]>('/about-feature');

    return res;
  }
}
