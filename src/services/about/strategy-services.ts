import { StrategyType } from '@/components/organism/forms/about';
import { apiHTTPClient } from 'lib/http-requester';

export class StrategyService {
  static async fetchStrategy() {
    const res = await apiHTTPClient.get('/strategy');

    return res;
  }

  static async updateStrategy(input: StrategyType) {
    const res = await apiHTTPClient.put('/strategy', {
      ...input,
    });

    return res;
  }
}
