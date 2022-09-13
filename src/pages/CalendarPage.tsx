
// import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import cl from './CalendarPage.module.css'

const CalendarPage = () => {

    // const localizer = momentLocalizer(moment) // or globalizeLocalizer

    return (
        <div className={cl.main_div}>
            {/* <Calendar localizer={localizer} /> */}
            <Calendar onChange={(date: Date) => {

            }} />
        </div>
    )
}

export default CalendarPage;