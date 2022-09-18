import DateDto from "../../dto/DateDto";

interface IDatesRepository {
  getDates: () => Promise<DateDto[]>;
  getDatesBetween: (startDate: Date, endDate: Date) => Promise<DateDto[]>;
}

export default IDatesRepository;