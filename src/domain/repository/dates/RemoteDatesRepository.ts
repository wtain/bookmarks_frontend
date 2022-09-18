import axios from 'axios';
import { DATES_ENDPOINT_BASE, DATES_ENDPOINT_RANGE } from '../../../constants/backend';
import DateDto from '../../dto/DateDto';
import IDatesRepository from './IDatesRepository';

class RemoteDatesRepository implements IDatesRepository {

  private static convertDateRecord(dateRecord: DateDto) {
    return {
        ...dateRecord,
        date: new Date(dateRecord.date)
    };
  }

  private static convertDateRecords(data: DateDto[]) {
    return data.map(RemoteDatesRepository.convertDateRecord);
  }

  async getDates(): Promise<DateDto[]> {
    return await axios.get<DateDto[]>(DATES_ENDPOINT_BASE)
      .then((response) => RemoteDatesRepository.convertDateRecords(response.data));
  }
  
  async getDatesBetween(startDate: Date, endDate: Date): Promise<DateDto[]> {
    return await axios.get<DateDto[]>(DATES_ENDPOINT_RANGE + startDate.toISOString() + "/" + endDate.toISOString())
      .then((response) => RemoteDatesRepository.convertDateRecords(response.data));
  }

}

export default RemoteDatesRepository;