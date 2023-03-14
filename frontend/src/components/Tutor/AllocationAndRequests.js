import { useState, useEffect } from "react"
import { fetchAPI, fetchPutAPI, fetchPostAPI, fetchDeleteAPI, getDateFromDayAndTime } from "../../functions"
import AvailabilityTimetable from "../Common/AvailabilityTimetable"
import DropdownMenu from "../Inputs/DropdownMenu"
import TimeInput from "../Inputs/TimeInput"
import Requests from "./Requests"


import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import BigCalendar from "../Common/BigCalendar"

const AllocationAndRequests = ({ userId }) => {

    // fetch API data
    const [availability, setAvailability] = useState('')

    const [backgroundEvents, setBackgroundEvents] = useState([])
    const [events, setEvents] = useState([])

    // form fields
    const [day, setFormDay] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')

    
    useEffect(()=>{
        const getAvailability = async () => {
            const fetchAvailability = await fetchAPI(`tutors/${userId}/availability`)
            setAvailability(fetchAvailability)

            // timetable
            const backgroundEventExtract = await fetchAvailability.dayandtime_set.map(({ day, start_time, end_time }) => {
                const [startHour, startMinute, startSecond] = start_time.split(':');
                const [endHour, endMinute, endSecond] = end_time.split(':');
                const start = getDateFromDayAndTime(day, start_time)
                
                const end = getDateFromDayAndTime(day, end_time)
                
                return {
                
                start: start,
                end: end,
                allDay:false,
                bSlotId: 123,
                }
            })

            setBackgroundEvents(backgroundEventExtract)

            const eventExtract = await fetchAvailability.dayandtime_set.map(({ day, bookedslot_set }) => {
                return bookedslot_set.map(({ start_time, end_time })=>{
                    const start = getDateFromDayAndTime(day, start_time)
                    
                    const end = getDateFromDayAndTime(day, end_time)
                    
                    return {
                    
                    start: start,
                    end: end,
                    allDay:false,
                    bSlotId: 123,
                };
                })
                
            }).flat()

            setEvents(eventExtract)
        }

        getAvailability()

    }, [userId]) 

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
    

    

    return (
        <>
            <div className="tutor-availability-main">

                <div className="tutor-availability-left">
                    {/* <h2>Available times: </h2> */}
                    
                    {backgroundEvents.length&&<BigCalendar backgroundEvents={backgroundEvents} events={events} />}
                    
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