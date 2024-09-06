import { HttpException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from '../../models/client.entity';
import { ERROR_CODES } from '../utils/errors';
import { Note } from '../../models/note.entity';
import { NewNoteDetails } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteReposistory: Repository<Note>,
  ) {}

  public async addNewNote(
    noteDetails: NewNoteDetails,
    userId: string,
  ): Promise<Note> {
    const noteExists = await this.noteReposistory.findOne({
      where: {
        ...noteDetails,
        userId,
      },
    });
    if (noteExists) {
      throw new HttpException('Note exists already.', 400);
    }
    return await this.noteReposistory.save({
      ...noteDetails,
      userId,
    });
  }

  public async getNotes(userId: string, clientId: string): Promise<Note[]> {
    return await this.noteReposistory.find({
      where: {
        clientId,
        userId,
      },
    });
  }

  public async deleteNote(userId: string, noteId: string): Promise<void> {
    const note = await this.noteReposistory.findOne({ where: { id: noteId } });
    if (note.userId != userId) {
      throw new HttpException(
        'You are not authorized to delete this note.',
        400,
      );
    }
    await this.noteReposistory.delete(noteId);
  }

  // public async getNoteById(userId: string, id: string): Promise<Client> {
  //   const client = await this.noteReposistory.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!client) {
  //     throw new HttpException("Client doesn't exist.", 400);
  //   }

  //   if (client.userId !== userId) {
  //     throw new HttpException('Cannot view this client information.', 400);
  //   }

  //   return client;
  // }

  // public async deleteClient(id: string, userId: string): Promise<void> {
  //   const client = await this.noteReposistory.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!client) {
  //     throw new HttpException("Client doesn't exist.", 400);
  //   }

  //   if (client.userId !== userId) {
  //     throw new HttpException(ERROR_CODES.PERMISSION_DENIED, 400);
  //   }

  //   await this.noteReposistory.delete({
  //     id,
  //   });
  // }

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
