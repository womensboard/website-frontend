import { PartnersInput } from '@/components/organism';
import { apiHTTPClient } from 'lib/http-requester';

export class PartnersServices {
  static async fetchPartner() {
    const res = await apiHTTPClient.get('/partners');

    return res;
  }

  static async createPartner(input: PartnersInput) {
    const res = await apiHTTPClient.post('/partners', {
      ...input,
      logo: input.logo,
    });

    return res;
  }

  static async updatePartner(partnerId: string, input: PartnersInput) {
    const res = await apiHTTPClient.put(`/partners/${partnerId}`, {
      ...input,
      logo: input.logo,
    });

    return res;
  }
}
