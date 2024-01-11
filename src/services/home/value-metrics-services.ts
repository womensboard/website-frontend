import { MetricsInput } from '@/components/organism';
import { apiHTTPClient } from 'lib/http-requester';

export class ValueMetricsServices {
  static async fetchMetrics() {
    const res = await apiHTTPClient.get('/value-metrics');

    return res;
  }

  static async updateMetrics(input: MetricsInput) {
    const res = await apiHTTPClient.put<MetricsInput>('/value-metrics', {
      ...input,
    });
    return res;
  }
}
