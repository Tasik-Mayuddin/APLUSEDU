import DropdownMenu from "../Inputs/DropdownMenu"
import { useState, useEffect } from "react"
import TimeInput from "../Inputs/TimeInput"
import BigCalendar from "../Common/BigCalendar"
import { getDateFromDayAndTime, formatTime } from "../../functions"
import moment from 'moment'

const TutorAvailability = ({ availability, child_id, subject, onRequest, currentTutorId, hideModal }) => {
    const [day, setFormDay] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')


    // Big Calendar states/effects
    const [backgroundEvents, setBackgroundEvents] = useState([])
    const [events, setEvents] = useState([])
    const [maxMin, setMaxMin] = useState('')

    useEffect(()=>{
        // timetable
        const getEvents = () => {
            const backgroundEventExtract = availability.dayandtime_set.map(({ day, start_time, end_time }) => {
                const start = getDateFromDayAndTime(day, start_time)
                const end = getDateFromDayAndTime(day, end_time)
                return {
                // necessary fields are defined here to be passed to onSelect callbacks
                start: start,
                end: end,
                allDay:false,
                day: day,
                start_time: start_time,
                end_time: end_time,
                time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
                }
            })
            setBackgroundEvents(backgroundEventExtract)
    
            // extract max and min times for timetable
            const maxTime = availability.dayandtime_set.reduce((max, { end_time }) => max > end_time ? max : end_time , '00:00:00')
            const minTime = availability.dayandtime_set.reduce((min, { start_time }) => min < start_time ? min : start_time , '24:00:00')
            setMaxMin({
                max: maxTime,
                min: minTime,
            })
            const eventExtract = availability.dayandtime_set.map(({ day, bookedslot_set }) => {
                return bookedslot_set.filter(bslot=>bslot.status === 'approved').map(({ start_time, end_time })=>{
                    // necessary fields are defined here to be passed to onSelect callbacks
                    const start = getDateFromDayAndTime(day, start_time)
                    const end = getDateFromDayAndTime(day, end_time)
                    return {
                    title: 'Booked',
                    start: start,
                    end: end,
                    allDay:false,
                    day: day,
                    time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
                };
                })
            }).flat()
    
            setEvents(eventExtract)
        }
        
        availability&&getEvents()
    }, [availability])
    
    const handleSlotSelect = (slotInfo) => {
        setFormDay(moment(slotInfo.start).format('dddd'))
        setStartTime(moment(slotInfo.start).format('HH:mm'))
        setEndTime(moment(slotInfo.end).format('HH:mm'))
    }

    return (
        <>
            <div className="overlay" onClick={hideModal}></div>
            <div className="tutorpov-availability">
                <div className="tutorpov-availability-left">
                    <h1>{availability.username}</h1>

                        {/* get list of teacher's free time */}
                        {backgroundEvents.length&&<BigCalendar 
                            backgroundEvents={backgroundEvents} 
                            events={events} 
                            handleSlotSelect={handleSlotSelect} 
                            maxMin={maxMin} 
                        />}
                </div>

                <div className="tutorpov-availability-right">
                    <form onSubmit={(e)=>onRequest(e, hideModal, currentTutorId, {child_id, subject, day, start_time, end_time})}>
                        <div className="form-control">
                            <DropdownMenu 
                                label = {"Day: "} 
                                placeholder = {"Select Day"} 
                                extra_options = {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                                onChange={(e) => setFormDay(e.target.value)} 
                                oriSelected={day}
                            />
                        </div>
                        <div className="form-control">
                            <TimeInput label={"Start Time:"} name={"start_time"} onChange={(e)=>setStartTime(e.target.value)} defaultValue={start_time} />
                        </div>
                        <div className="form-control">
                            <TimeInput label={"End Time:"} name={"end_time"} onChange={(e)=>setEndTime(e.target.value)} defaultValue={end_time} />
                        </div>
                        <input type='submit' value="Request" className="btn btn-block"/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TutorAvailability