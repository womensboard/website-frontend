import { Project } from '@/components/molecules/project/project-info';
import { apiHTTPClient } from 'lib/http-requester';

export class ProjectsService {
  static async fetchProjects() {
    const res = await apiHTTPClient.get<Project[]>('/projects');

    return res;
  }

  static async createProject(input: Project) {
    const res = await apiHTTPClient.post('/projects', {
      ...input,
    });

    return res;
  }

  static async updateProject(projectId: string, input: Project) {
    const res = await apiHTTPClient.put(`/projects/${projectId}`, {
      title: input.title,
      location: input.location,
      description: input.description,
      imageURL: input.imageURL,
      sponsored: input.sponsored,
    });

    return res;
  }

  static async deleteProject(projectId: string) {
    const res = await apiHTTPClient.delete(`/projects/${projectId}`);

    return res;
  }
}
