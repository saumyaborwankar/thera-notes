import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { GetCurrentUserId } from '../../common/guards/decorators/getCurrentUserId.decorator';
import { Note } from '../../models/note.entity';
import { NewNoteDetails } from './dto/note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  @Post('/')
  addNote(
    @GetCurrentUserId() userId: string,
    @Body() newClientDetails: NewNoteDetails,
  ): Promise<Note> {
    return this.noteService.addNewNote(newClientDetails, userId);
  }

  @Get('/:clientId')
  getNotesForClient(
    @GetCurrentUserId() userId: string,
    @Param('clientId') clientId: string,
  ): Promise<Note[]> {
    return this.noteService.getNotes(userId, clientId);
  }

  @Delete('/:noteId')
  deleteClient(
    @GetCurrentUserId() userId: string,
    @Param('noteId') noteId: string,
  ): Promise<void> {
    return this.noteService.deleteNote(userId, noteId);
  }
}
