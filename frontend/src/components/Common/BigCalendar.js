import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './BigCalendar.scss'

const BigCalendar = ({ backgroundEvents, events, handleEventSelect, maxMin, handleSlotSelect }) => {
    const localizer = momentLocalizer(moment)
    const formats = {
        dayFormat: 'dddd',
        eventTimeRangeFormat: ({ start, end }, culture, localizer) => ''
    }

    return (
        <div>
            <Calendar
                localizer={localizer}
                backgroundEvents = {backgroundEvents}
                events = {events}
                dayLayoutAlgorithm="no-overlap"
                defaultView="week"
                views={['week']}
                startAccessor="start"
                endAccessor="end"
                formats={formats}
                toolbar={false}
                showAllEvents={false}
                allDayAccessor={null}
                min={new Date(2017, 10, 0, Number(maxMin.min.split(':')[0])-1, Number(maxMin.min.split(':')[1]), 0)}
                max={new Date(2017, 10, 0, Number(maxMin.max.split(':')[0])+1, Number(maxMin.min.split(':')[1]), 0)} 
                timeslots={2}
                step={30}
                
                selectable={handleSlotSelect&&true}
                onSelectEvent={handleEventSelect}
                onSelectSlot={handleSlotSelect}
            />
        </div>
    )
}

export default BigCalendar