import { useState, useEffect } from "react"
import { fetchAPI, fetchPutAPI, fetchPostAPI, fetchDeleteAPI, formatTime, getDateFromDayAndTime } from "../../functions"
import AvailabilityTimetable from "../Common/AvailabilityTimetable"
import DropdownMenu from "../Inputs/DropdownMenu"
import TimeInput from "../Inputs/TimeInput"
import Requests from "./Requests"
import BigCalendar from "../Common/BigCalendar"

const AllocationAndRequests = ({ userId }) => {

    // fetch API data
    const [availability, setAvailability] = useState('')

    // big calendar states
    const [backgroundEvents, setBackgroundEvents] = useState([])
    const [events, setEvents] = useState([])
    const [maxMin, setMaxMin] = useState('')

    // form fields
    const [day, setFormDay] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')

    // timetable onSelect states, prefix 'b' for booked slots
    const [bDay, setBDay] = useState('')
    const [bTime, setBTime] = useState('')
    const [bSubjectAndLevel, setBSubjectAndLevel] = useState('')
    const [bStudent, setBStudent] = useState('')
    
    useEffect(()=>{
        const getAvailability = async () => {
            const fetchAvailability = await fetchAPI(`tutors/${userId}/availability`)
            setAvailability(fetchAvailability)

            
        }

        getAvailability()

    }, [userId]) 

    useEffect(()=>{
        // timetable
        const getEvents = () => {
            const backgroundEventExtract = availability.dayandtime_set.map(({ id, day, start_time, end_time }) => {
                const start = getDateFromDayAndTime(day, start_time)
                const end = getDateFromDayAndTime(day, end_time)
                return {
                start: start,
                end: end,
                allDay:false,
                dayAndTimeId: id,
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
                return bookedslot_set.filter(bslot=>bslot.status == 'approved').map(({ start_time, end_time, id, subject_and_level, student })=>{
                    const start = getDateFromDayAndTime(day, start_time)
                    const end = getDateFromDayAndTime(day, end_time)
                    
                    return {
                    title: 'Booked',
                    start: start,
                    end: end,
                    allDay:false,
                    bSlotId: id,
                    day: day,
                    time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
                    subject_and_level: subject_and_level.__str__,
                    student: student.name
                };
                })
                
            }).flat()
    
            setEvents(eventExtract)
        }
        
        availability&&getEvents()
    }, [availability])

    const onSubmit = async (e, toPost) => {
        e.preventDefault()
        const fetchAvailability = await fetchPostAPI(`tutors/${userId}/availability`, toPost)
        setAvailability(fetchAvailability)
    }
    // accepting a request
    const onAccept = async(toPost) => {
        const fetchRequest = await fetchPutAPI(`tutors/${userId}/request`, toPost)
        setAvailability(fetchRequest)
      }
    // declining a request (delete)
    const onDecline = async(toPost) => {
        const fetchRequest = await fetchDeleteAPI(`tutors/${userId}/request`, toPost)
        setAvailability(fetchRequest)
      }
    
    // callback when selecting event on timetable
    const handleSlotSelect = (item) => {
        // if booked slot is selected
        if (item.bSlotId) {
            setBDay(item.day)
            setBStudent(item.student)
            setBSubjectAndLevel(item.subject_and_level)
            setBTime(item.time)
        }

        // if free time slot is selected
        else if (item.dayAndTimeId) {
            console.log(item.dayAndTimeId)
        }
    }
    

    return (
        <>
            <div className="tutor-availability-main">

                <div className="tutor-availability-left">            
                    {backgroundEvents.length&&<BigCalendar backgroundEvents={backgroundEvents} events={events} handleSlotSelect={handleSlotSelect} maxMin={maxMin} />}
                    <div>
                        <h2>{bDay}</h2>
                        <h3>{bTime}</h3>
                        <h4>{bSubjectAndLevel}</h4>
                        <p>{bStudent}</p>
                    </div>
                </div>

                <div>
                    <form onSubmit={(e)=>onSubmit(e, {day, start_time, end_time})}>
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
                            <TimeInput label={"Start Time:"} name={"start_time"} onChange={(e)=>setStartTime(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <TimeInput label={"End Time:"} name={"end_time"} onChange={(e)=>setEndTime(e.target.value)} />
                        </div>
                        <input type='submit' value="Add" className="btn btn-block"/>
                    </form>

                    <div>
                        <h2>Requests</h2>
                        {availability&&<Requests availability={availability} onAccept={onAccept} onDecline={onDecline} />}
                        {/* {requests&&requests.map((item, id) => <RequestIndie key={id} request={item} userId={userId} onAccept={onAccept} />)} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocationAndRequests