import { type CreateProjectInput, type Project, ProjectStatus, JobType } from '@edupilot/shared/src/types/project.types.js';
import { queueManager } from '@/queues/queue-manager.js';


const generateId = () => Math.random().toString(36).slice(2);


const projects: Map<string, Project> = new Map();

export class ProjectService {
  
  async createProject(userId: string, input: CreateProjectInput): Promise<Project> {
    const projectId = generateId();
    
    const project: Project = {
      id: projectId,
      userId,
      title: input.title || `Video Project ${projectId}`,
      prompt: input.prompt,
      status: ProjectStatus.CREATED,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database (replace with actual DB call)
    projects.set(projectId, project);
    
    // Start processing pipeline
    await this.startProcessingPipeline(projectId, userId, input);
    
    return project;
  }

  async getProject(projectId: string): Promise<Project | null> {
    // Replace with actual DB query
    return projects.get(projectId) || null;
  }

  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    const project = projects.get(projectId);
    if (!project) throw new Error('Project not found');
    
    Object.assign(project, updates, { updatedAt: new Date() });
    projects.set(projectId, project);
  }

  async getProjectStatus(projectId: string) {
    const project = await this.getProject(projectId);
    if (!project) throw new Error('Project not found');

    // Get job status from queues
    const jobCounts = await queueManager.getJobCounts();
    
    return {
      status: project.status,
      progress: project.progress,
      videoUrl: project.videoUrl,
      thumbnailUrl: project.thumbnailUrl,
      duration: project.duration,
      error: project.error,
      queueStatus: jobCounts
    };
  }

  private async startProcessingPipeline(
    projectId: string, 
    userId: string, 
    input: CreateProjectInput
  ) {
    // Update project status
    await this.updateProject(projectId, { 
      status: ProjectStatus.PROCESSING,
      progress: 5
    });

    const baseJobData = { projectId, userId, input };

    try {
      
      const jobs = [
        { type: JobType.PROMPT_ENHANCEMENT, queue: 'text-processing', delay: 0 },
        { type: JobType.TOC_GENERATION, queue: 'text-processing', delay: 2000 },
        { type: JobType.RESOURCE_PREPARATION, queue: 'text-processing', delay: 4000 },
        { type: JobType.TTS_GENERATION, queue: 'gpu-intensive', delay: 6000 },
        { type: JobType.VIDEO_RECORDING, queue: 'media-processing', delay: 8000 },
        { type: JobType.CHUNK_PROCESSING, queue: 'media-processing', delay: 10000 },
        { type: JobType.VIDEO_STITCHING, queue: 'media-processing', delay: 12000 },
        { type: JobType.TRANSCODING, queue: 'media-processing', delay: 14000 },
        { type: JobType.THUMBNAIL_GENERATION, queue: 'media-processing', delay: 16000 },
        { type: JobType.CLEANUP, queue: 'text-processing', delay: 18000 },
      ];

      for (const job of jobs) {
        await queueManager.addJob(
          job.queue,
          job.type,
          baseJobData,
          { 
            delay: job.delay,
            priority: this.getJobPriority(job.type)
          }
        );
      }

    } catch (error) {
      await this.updateProject(projectId, {
        status: ProjectStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private getJobPriority(jobType: JobType): number {
    const priorities = {
      [JobType.PROMPT_ENHANCEMENT]: 10,
      [JobType.TOC_GENERATION]: 9,
      [JobType.RESOURCE_PREPARATION]: 8,
      [JobType.TTS_GENERATION]: 7,
      [JobType.VIDEO_RECORDING]: 6,
      [JobType.CHUNK_PROCESSING]: 5,
      [JobType.VIDEO_STITCHING]: 4,
      [JobType.TRANSCODING]: 3,
      [JobType.THUMBNAIL_GENERATION]: 2,
      [JobType.CLEANUP]: 1,
    };
    return priorities[jobType] || 1;
  }
}

export const projectService = new ProjectService();