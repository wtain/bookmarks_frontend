import DateDto from "../../dto/DateDto";
import IDatesRepository from "./IDatesRepository";

class MockDatesRepository implements IDatesRepository {

  private dateRecords: DateDto[];

  constructor() {
    this.dateRecords = [
      {
        "count": 4,
        "date": new Date("2022-09-16T00:00:00.000Z")
      },
      {
        "count": 11,
        "date": new Date("2022-09-13T00:00:00.000Z")
      },
      {
        "count": 6,
        "date": new Date("2022-09-14T00:00:00.000Z")
      },
      {
        "count": 2,
        "date": new Date("2022-09-15T00:00:00.000Z")
      },
      {
        "count": 8,
        "date": new Date("2022-09-17T00:00:00.000Z")
      },
      {
        "count": 10,
        "date": new Date("2022-09-11T00:00:00.000Z")
      },
      {
        "count": 2,
        "date": new Date("2022-09-12T00:00:00.000Z")
      }
    ];
  }

  async getDates(): Promise<DateDto[]> {
    return this.dateRecords;
  }

  async getDatesBetween(_startDate: Date, _endDate: Date): Promise<DateDto[]> {
    return this.dateRecords;
  }

}

export default MockDatesRepository;