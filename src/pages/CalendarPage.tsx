
// import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import Calendar, { CalendarTileProperties, ViewCallbackProperties } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import cl from './CalendarPage.module.css'
import IDatesRepository from '../domain/repository/dates/IDatesRepository';
import { useEffect, useState } from 'react';
import { firstDayOfMonth, addOneMonth, datesEqual } from '../utils/DateTimeUtils';

// Marking dates
// see: https://stackoverflow.com/questions/60446117/how-to-mark-particular-dates-in-react-calender
// When month is switched - reload dates from the backend for the selected month

interface Props {
    datesRepository: IDatesRepository;
}

const CalendarPage = (props: Props) => {

    // const localizer = momentLocalizer(moment) // or globalizeLocalizer

    const navigate = useNavigate();

    // const calendarRef = useRef<Calendar | null>(null);

    const [startDate, setStartDate] = useState<Date>(firstDayOfMonth(new Date()));
    const [mark, setMark] = useState<Date[]>([]);

    const loadDates = async (startDate: Date): Promise<Date[]> => {
        const endDate = addOneMonth(startDate);
        const result = await props.datesRepository.getDatesBetween(startDate, endDate);
        return result.map((dateDto) => dateDto.date);
    }

    useEffect(() => {
        (async function doLoad() {
            const dates = await loadDates(startDate);
            setMark(dates);
            // console.log(dates.map(date => date.toISOString()));
        })();
    }, [startDate]);

    // ['2022-09-16T00:00:00.000Z', '2022-09-13T00:00:00.000Z', '2022-09-14T00:00:00.000Z', '2022-09-15T00:00:00.000Z', '2022-09-17T00:00:00.000Z', '2022-09-11T00:00:00.000Z', '2022-09-12T00:00:00.000Z']
    // 2022-09-20T22:00:00.000Z

    return (
        <div className={cl.main_div}>
            {/* <Calendar localizer={localizer} /> */}
            <Calendar
                
                activeStartDate={startDate}

                tileClassName={(props: CalendarTileProperties) => {
                    // console.log(props.date.toISOString());
                    if (mark.find(markDate => datesEqual(markDate, props.date))) {
                        return cl.highlight;
                    }
                    return "";
                  }}
                
                onChange={(date: Date) => {
                    navigate("/date/" + date.toISOString())
                }}
                
                onActiveStartDateChange={(calendarProps: ViewCallbackProperties) => {
                    console.log(calendarProps.activeStartDate);

                    setStartDate(calendarProps.activeStartDate);
                }}
            />
        </div>
    )
}

export default CalendarPage;