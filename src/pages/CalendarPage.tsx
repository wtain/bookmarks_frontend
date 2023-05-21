
import { useNavigate } from 'react-router-dom';
import IDatesRepository from '../domain/repository/dates/IDatesRepository';
import { useEffect, useState } from 'react';
import { firstDayOfMonth, addOneMonth, lastDayOfMonth, range } from '../utils/DateTimeUtils';
import { DatePicker } from '@shopify/polaris';
import moment from 'moment';
// import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';

// Marking dates
// see: https://stackoverflow.com/questions/60446117/how-to-mark-particular-dates-in-react-calender
// When month is switched - reload dates from the backend for the selected month

interface Props {
    datesRepository: IDatesRepository;
}

const CalendarPage = (props: Props) => {

    const navigate = useNavigate();

    const [startDate, setStartDate] = useState<Date>(firstDayOfMonth(new Date()));
    const [mark, setMark] = useState<Date[]>([]);
    const [invertedMark, setInvertedMark] = useState<Date[]>([]);

    const loadDates = async (startDate: Date): Promise<Date[]> => {
        const endDate = addOneMonth(startDate);
        const result = await props.datesRepository.getDatesBetween(startDate, endDate);
        return result.map((dateDto) => dateDto.date);
    }

    useEffect(() => {
        (async function doLoad() {
            const dates = await loadDates(startDate);
            setMark(dates);
            const datesHash = new Set(dates.map(date => date.getDate()));
            const lastDay = lastDayOfMonth(startDate);
            const inverted = range(startDate.getDate(), lastDay.getDate())
                    .filter(date => !datesHash.has(date))
                    .map(day => new Date(lastDay.getFullYear(), lastDay.getMonth(), day));
            setInvertedMark(inverted);
        })();
    }, [startDate]);

    return (
            <DatePicker 
                month={startDate.getMonth()}
                year={startDate.getFullYear()}
                onChange={({ start }) => {
                    navigate("/date/" + moment(start).format('YYYY-MM-DD'));
                }}
                onMonthChange={(month: number, year: number) => {
                    setStartDate(new Date(year, month, 1));
                }}
                disableSpecificDates={invertedMark}
            />
    )
}

export default CalendarPage;