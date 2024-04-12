import { NewsData, NewsInput } from '@/components/organism';
import { apiHTTPClient } from 'lib/http-requester';

export class NewsService {
  static async fetchNews() {
    const res = await apiHTTPClient.get<NewsData[]>('/news');

    return res;
  }

  static async createNews(input: NewsInput) {
    const res = await apiHTTPClient.post('/news', {
      ...input,
      imageURL: input.imageURL,
    });

    return res;
  }

  static async updateNews(newsId: string, input: NewsInput) {
    const res = await apiHTTPClient.put(`/news/${newsId}`, {
      title: input.title,
      description: input.description,
      author: input.author,
      imageURL: input.imageURL,
    });

    return res;
  }

  static async deleteNews(newsId: string) {
    const res = await apiHTTPClient.delete(`/news/${newsId}`);

    return res;
  }

  static async getNewsById(id: string) {
    const res = await apiHTTPClient.get<NewsData[]>('/news');

    const singleNews = res.data?.find((news) => news.id === id);
    return { ...res, data: singleNews };
  }
}
