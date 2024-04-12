import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import { apiHTTPClient } from 'lib/http-requester';

export class ManagementService {
  static async fetchMangement() {
    const res = await apiHTTPClient.get<TeamDetailsData[]>('/management-team');

    return res;
  }

  static async createMangement(input: TeamDetailsType) {
    const res = await apiHTTPClient.post('/management-team', {
      ...input,
    });

    return res;
  }

  static async updateMangement(mangementId: string, input: TeamDetailsType) {
    const res = await apiHTTPClient.put(`/management-team/${mangementId}`, {
      ...input,
    });

    return res;
  }

  static async deleteManagement(mangementId: string) {
    const res = await apiHTTPClient.delete(`/management-team/${mangementId}`);

    return res;
  }
}
