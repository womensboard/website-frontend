import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import { apiHTTPClient } from 'lib/http-requester';

export class TrusteeService {
  static async fetchTrustee() {
    const res = await apiHTTPClient.get<TeamDetailsData[]>('/trustees');

    return res;
  }

  static async createTrustee(input: TeamDetailsType) {
    const res = await apiHTTPClient.post('/trustees', {
      ...input,
    });

    return res;
  }

  static async updateTrustee(trusteesId: string, input: TeamDetailsType) {
    const res = await apiHTTPClient.put(`/trustees/${trusteesId}`, {
      ...input,
    });

    return res;
  }

  static async deleteTrustee(trusteesId: string) {
    const res = await apiHTTPClient.delete(`/trustees/${trusteesId}`);

    return res;
  }
}
