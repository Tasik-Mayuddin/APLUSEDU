import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './BigCalendar.scss'

const BigCalendar = ({ backgroundEvents, events }) => {
    const localizer = momentLocalizer(moment)
    const formats = {
        dayFormat: 'dddd',
        dayRangeHeaderFormat: ({ start, end }) => {
            const startDate = moment(start);
            const endDate = moment(end);
            return `${startDate.format('MMMM D')} - ${endDate.format('D, YYYY')}`;
            },
            timeGutterFormat: 'h:mm A',
            timeRangeFormat: ({ start, end }) => `${moment(start).format('h:mm A')} - ${moment(end).format('h:mm A')}`,
    }

    const style = {
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
        // color: 'white',
        // padding: '50px',
        // borderRadius: '8px',
    }
    const handleSlotSelect = ({start, end, bSlotId}) => {
        console.log(bSlotId)
        // do something else here
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
                min={new Date(2017, 10, 0, 8, 0, 0)}
                max={new Date(2017, 10, 0, 20, 0, 0)} 
                timeslots={2}
                step={30}
                
                selectable  
                onSelectEvent={handleSlotSelect}
            />
        </div>
    )
}

export default BigCalendar