import { Queue } from 'bullmq';
import {queueConfigs} from "@edupilot/queue-config/redis.js";
import {JobType, type JobData} from "@edupilot/shared/src/types/project.types.js";

class QueueManager {
  private static instance: QueueManager;
  private queues: Map<string, Queue> = new Map();

  private constructor() {
    this.initializeQueues();
  }

  static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  private initializeQueues() {
    Object.entries(queueConfigs).forEach(([name, config]) => {
      const queue = new Queue(name, config);
      this.queues.set(name, queue);
      
      // Add queue event listeners
      this.setupQueueEventListeners(queue, name);
    });
  }

  private setupQueueEventListeners(queue: Queue, queueName: string) {
    queue.on('completed', (job) => {
      console.log(`✅ [${queueName}] Job ${job.id} completed`);
    });

    queue.on('failed', (job, err) => {
      console.error(`❌ [${queueName}] Job ${job?.id} failed:`, err.message);
    });

    queue.on('progress', (job, progress) => {
      console.log(`🔄 [${queueName}] Job ${job.id} progress: ${progress}%`);
    });
  }

  async addJob(
    queueName: string, 
    jobType: JobType, 
    data: JobData,
    options?: any
  ) {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    const jobId = `${data.projectId}-${jobType}-${Date.now()}`;
    
    return await queue.add(jobType, data, {
      jobId,
      ...options
    });
  }

  getQueue(name: string): Queue | undefined {
    return this.queues.get(name);
  }

  async getJobCounts() {
    const counts: Record<string, any> = {};
    
    for (const [name, queue] of this.queues) {
      counts[name] = await queue.getJobCounts(
        'active', 'waiting', 'completed', 'failed'
      );
    }
    
    return counts;
  }

  async gracefulShutdown() {
    console.log('🛑 Closing queues...');
    const closePromises = Array.from(this.queues.values()).map(q => q.close());
    await Promise.all(closePromises);
  }
}

export const queueManager = QueueManager.getInstance();