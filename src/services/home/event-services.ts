import { EventData, EventInput } from '@/components/organism';
import { apiHTTPClient } from 'lib/http-requester';

export class EventService {
  static async fetchEvents() {
    const res = await apiHTTPClient.get<EventData[]>('/events');

    return res;
  }

  static async createEvents(input: EventInput) {
    const res = await apiHTTPClient.post('/events', {
      ...input,
    });

    return res;
  }

  static async updateEvents(eventId: string, input: EventInput) {
    const res = await apiHTTPClient.put(`/events/${eventId}`, {
      ...input,
    });

    return res;
  }

  static async deleteEvent(eventId: string) {
    const res = await apiHTTPClient.delete(`/events/${eventId}`);

    return res;
  }

  static async getEventById(id: string) {
    const res = await apiHTTPClient.get<EventData[]>('/events');

    const singleNews = res.data?.find((news) => news.id === id);
    return { ...res, data: singleNews };
  }
}
