import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

export class SampleDto {
  name: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Post('upload')
  async uploadFile(
    // @Body() body: SampleDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    try {
      files.forEach(async (file) => {
        await this.appService.uploadImage(file);
      });

      return {
        status: 'success',
        // file: file.buffer.toString(),
      };
    } catch (e) {
      return {
        status: 'fail',
      };
    }
  }
}
