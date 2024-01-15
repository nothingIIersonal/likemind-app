import { Injectable } from '@nestjs/common';
import EventRepository from '@repositories/event.repository';

@Injectable()
export class MapService {
  async retrieveAllPlacemarks() {
    const data = await EventRepository.retrieveAll()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    if (!data) {
      return null;
    }

    const marks = [];
    data.forEach((item) => {
      marks.push({ title: item.title, lat: item.lat, lon: item.lon });
    });

    return { status: 200, marks: marks };
  }
}
