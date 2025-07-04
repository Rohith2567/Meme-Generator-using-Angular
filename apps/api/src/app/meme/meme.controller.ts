import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MemeService } from './meme.service';
import { CreateMemeDto } from './dto/create-meme.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('meme')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Post()
  create(@Body() createMemeDto: CreateMemeDto) {
    return this.memeService.create(createMemeDto);
  }

  @SkipThrottle()
  @Get()
  findAll(@Query('q') q: string) {
    return this.memeService.findAll(q);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.memeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMemeDto: UpdateMemeDto) {
  //   return this.memeService.update(+id, updateMemeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.memeService.remove(+id);
  // }
}
