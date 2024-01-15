import {
  Controller,
  UseGuards,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MapService } from './map.service';
import { JwtAuthGuard } from '@modules/auth/jwt.authguard';

@Controller('/map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/retrieve-all-placemarks')
  @UseInterceptors(FileInterceptor(''))
  async retrieveAllPlacemarks(@Req() req: Request, @Res() res: Response) {
    try {
      const resp = await this.mapService.retrieveAllPlacemarks();

      return res
        .status(resp.status)
        .set({ 'Content-Type': 'application/json' })
        .send(resp);
    } catch (err) {
      throw err;
    }
  }
}
