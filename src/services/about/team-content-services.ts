import { TemHeadingType } from '@/components/organism/forms/about';
import { apiHTTPClient } from 'lib/http-requester';

export class TeamContentService {
  static async fetchTeamHeading() {
    const res = await apiHTTPClient.get('/our-team');

    return res;
  }

  static async updateTeamHeading(input: TemHeadingType) {
    const res = await apiHTTPClient.put('/our-team', {
      ...input,
    });

    return res;
  }
}
