import { TeamDetailsData, TeamDetailsType } from 'config/our-team';
import { apiHTTPClient } from 'lib/http-requester';

export class CouncilService {
  static async fetchCouncil() {
    const res = await apiHTTPClient.get<TeamDetailsData[]>(
      '/governing-council'
    );

    return res;
  }

  static async createCouncil(input: TeamDetailsType) {
    const res = await apiHTTPClient.post('/governing-council', {
      ...input,
    });

    return res;
  }

  static async updateCouncil(boardId: string, input: TeamDetailsType) {
    const res = await apiHTTPClient.put(`/governing-council/${boardId}`, {
      ...input,
    });

    return res;
  }

  static async deleteCouncil(boardId: string) {
    const res = await apiHTTPClient.delete(`/governing-council/${boardId}`);

    return res;
  }
}
