
// import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import Calendar, { ViewCallbackProperties } from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import cl from './CalendarPage.module.css'

// Marking dates
// see: https://stackoverflow.com/questions/60446117/how-to-mark-particular-dates-in-react-calender
// When month is switched - reload dates from the backend for the selected month

const CalendarPage = () => {

    // const localizer = momentLocalizer(moment) // or globalizeLocalizer

    const navigate = useNavigate();

    return (
        <div className={cl.main_div}>
            {/* <Calendar localizer={localizer} /> */}
            <Calendar onChange={(date: Date) => {
                navigate("/date/" + date.toISOString())
            }}
                onActiveStartDateChange={(props: ViewCallbackProperties) => {
                    console.log(props.activeStartDate);

                    
            }}
            />
        </div>
    )
}

export default CalendarPage;