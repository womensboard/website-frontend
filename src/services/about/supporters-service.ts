import { SupportersConfig } from 'config/supporters';
import { apiHTTPClient } from 'lib/http-requester';

export class SupporterService {
  static async fetchSupporters() {
    const res = await apiHTTPClient.get<SupportersConfig>('/supporters');
    return res;
  }

  static async createSupporter(input: SupportersConfig) {
    const res = await apiHTTPClient.post('/supporters', input);
    return res;
  }
}
