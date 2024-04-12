import { Activities } from '@/components/layout/areas-of-activities';
import { apiHTTPClient } from 'lib/http-requester';

export class ActivitiesService {
  static async fetchActivities() {
    const res = await apiHTTPClient.get<Activities[]>('/activities');

    return res;
  }

  static async createActivity(input: Activities) {
    const res = await apiHTTPClient.post('/activities', {
      ...input,
    });

    return res;
  }

  static async updateActivity(activityID: string, input: Activities) {
    const res = await apiHTTPClient.put(`/activities/${activityID}`, {
      ...input,
    });

    return res;
  }

  static async deleteActivity(activityID: string) {
    const res = await apiHTTPClient.delete(`/activities/${activityID}`);

    return res;
  }
}
