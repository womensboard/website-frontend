import { HeroDetailData, HeroSectionInput } from 'entities/hero';
import { apiHTTPClient } from 'lib/http-requester';

export class HeroService {
  static async updateHeroSection(
    page: HeroDetailData['page'],
    input: HeroSectionInput
  ) {
    const res = await apiHTTPClient.put('/hero-section', {
      ...input,
      page,
    });

    return res;
  }

  static async fetchAllHeros() {
    const res = await apiHTTPClient.get<HeroDetailData[]>('/hero-section');

    return res;
  }
}
