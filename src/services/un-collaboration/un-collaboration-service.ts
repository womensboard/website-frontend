import { YouthVoicesType } from '@/components/organism/forms/UN-collaboration';
import { CollaborationItem } from 'config/collaborations';
import { apiHTTPClient } from 'lib/http-requester';

const endpointMapper = {
  contribution: '/collaboration-section',
  conference: '/collaboration-section',
};

type UnTypes = keyof typeof endpointMapper;

export class UNCollaborationService {
  static async fetch(type: UnTypes) {
    const res = await apiHTTPClient.get<CollaborationItem[]>(
      endpointMapper[type]
    );

    return res;
  }

  static async create(type: UnTypes, input: CollaborationItem) {
    const res = await apiHTTPClient.post(endpointMapper[type], input);

    return res;
  }

  static async update(
    inputId: string,
    type: UnTypes,
    input: CollaborationItem
  ) {
    const res = await apiHTTPClient.put(
      `${endpointMapper[type]}/${inputId}`,
      input
    );

    return res;
  }

  static async fetchYouthVoices() {
    const res = await apiHTTPClient.get('/nigerian-youth-voices');
    return res;
  }

  static async updateYouthVoices(input: YouthVoicesType) {
    const res = await apiHTTPClient.put('/nigerian-youth-voices', {
      ...input,
    });
    return res;
  }
}
