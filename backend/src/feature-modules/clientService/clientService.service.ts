import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '../../models/client.entity';
import { ERROR_CODES } from '../utils/errors';
import { NewClientDetails } from './dto/client.dto';

@Injectable()
export class ClientServiceService {
  constructor(
    @InjectRepository(Client)
    private clientReposistory: Repository<Client>,
  ) {}

  public async addNewClient(clientDetails: NewClientDetails): Promise<Client> {
    const clientExists = await this.clientReposistory.findOne({
      where: {
        ...clientDetails,
      },
    });
    if (clientExists) {
      throw new HttpException('Client exists.', 400);
    }
    return await this.clientReposistory.save({
      ...clientDetails,
    });
  }

  public async getClients(userId: string): Promise<Client[]> {
    return await this.clientReposistory.find({
      where: {
        userId,
      },
    });
  }

  public async getClientById(userId: string, id: string): Promise<Client> {
    const client = await this.clientReposistory.findOne({
      where: {
        id,
      },
    });
    if (!client) {
      throw new HttpException("Client doesn't exist.", 400);
    }

    if (client.userId !== userId) {
      throw new HttpException('Cannot view this client information.', 400);
    }

    return client;
  }

  public async deleteClient(id: string, userId: string): Promise<void> {
    const client = await this.clientReposistory.findOne({
      where: {
        id,
      },
    });

    if (!client) {
      throw new HttpException("Client doesn't exist.", 400);
    }

    if (client.userId !== userId) {
      throw new HttpException(ERROR_CODES.PERMISSION_DENIED, 400);
    }

    await this.clientReposistory.delete({
      id,
    });
  }

  //   private videoMapper(video: Video): VideoResponse {
  //     return {
  //       url: video.url,
  //       description: video.description,
  //       id: video.id,
  //       title: video.title,
  //       creator: video.creator,
  //     };
  //   }

  //   public async getVideosByCreator(creator: string): Promise<VideoResponse[]> {
  //     const videos = await this.videoRepository.find({
  //       where: {
  //         creator,
  //       },
  //     });

  //     if (videos.length == 0) {
  //       throw new HttpException('No content available from this user.', 400);
  //     }
  //     return videos.map((video) => this.videoMapper(video));
  //   }

  //   public async getVideoUploadUrl(creator: string): Promise<string> {
  //     //replace with s3 object key for upload
  //     // return `/tmp/content/${creator}/${uuidv4()}.${this.allowedMimeType}`;
  //     const url = await this.s3Client.getPresignedUrl(
  //       `/content/${creator}/${uuidv4()}.mp4`,
  //     );
  //     return url;
  //   }

  //   public async getVideoDetailsByid(creator: string, videoId: string) {
  //     const video = await this.videoRepository.findOne({
  //       where: {
  //         id: videoId,
  //       },
  //     });
  //     if (!video) {
  //       throw new HttpException('No video found', 400);
  //     }

  //     if (video.creator !== creator) {
  //       throw new HttpException(ERROR_CODES.PERMISSION_DENIED, 400);
  //     }
  //   }

  //   public async saveVideoDetails() {}

  //   public async updateVideoDetails() {}

  //   public async deleteVideoDetails() {}
}
