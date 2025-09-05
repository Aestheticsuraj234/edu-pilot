import { z } from 'zod';

export const CreateProjectSchema = z.object({
  prompt: z.string().min(10).max(5000),
  title: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

export enum JobType {
  PROMPT_ENHANCEMENT = 'prompt_enhancement',
  TOC_GENERATION = 'toc_generation',
  RESOURCE_PREPARATION = 'resource_preparation', 
  TTS_GENERATION = 'tts_generation',
  VIDEO_RECORDING = 'video_recording',
  CHUNK_PROCESSING = 'chunk_processing',
  VIDEO_STITCHING = 'video_stitching',
  TRANSCODING = 'transcoding',
  THUMBNAIL_GENERATION = 'thumbnail_generation',
  CLEANUP = 'cleanup'
}

export enum ProjectStatus {
  CREATED = 'created',
  PROCESSING = 'processing', 
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  status: ProjectStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  error?: string;
}

export interface JobData {
  projectId: string;
  userId: string;
  input?: any;
  metadata?: Record<string, any>;
}