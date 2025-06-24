/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';
// import { describe, beforeEach, it } from 'node:test';

describe('MemeController', () => {
  let controller: MemeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemeController],
      providers: [MemeService],
    }).compile();

    controller = module.get<MemeController>(MemeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
