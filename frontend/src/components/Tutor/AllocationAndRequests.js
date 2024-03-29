import { useState, useEffect } from "react"
import { fetchAPI, fetchPutAPI, fetchPostAPI, fetchDeleteAPI, formatTime, getDateFromDayAndTime } from "../../functions"
import AvailabilityTimetable from "../Common/AvailabilityTimetable"
import DropdownMenu from "../Inputs/DropdownMenu"
import TimeInput from "../Inputs/TimeInput"
import Requests from "./Requests"
import BigCalendar from "../Common/BigCalendar"
import AddOrEditDnT from "./AddOrEditDnT"
import ButtonSmall from "../Buttons/ButtonSmall"
import { Link } from "react-router-dom"
import { BsFillChatDotsFill } from "react-icons/bs"

const AllocationAndRequests = ({ userId }) => {

    // fetch API data
    const [availability, setAvailability] = useState('')

    // big calendar states
    const [backgroundEvents, setBackgroundEvents] = useState([])
    const [events, setEvents] = useState([])
    const [maxMin, setMaxMin] = useState('')

    
    // timetable onSelect states, prefix 'b' for booked slots
    const [onSelectDetails, setOnSelectDetails] = useState('')
    const [editFields, setEditFields] = useState('')

    // toggle views
    const [showEventInfo , setShowEventInfo] = useState(false)
    const [showForm , setShowForm] = useState(false)


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
                // necessary fields are defined here to be passed to onSelect callbacks
                start: start,
                end: end,
                allDay:false,
                dayAndTimeId: id,
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
                return bookedslot_set.filter(bslot=>bslot.status === 'approved').map(({ start_time, end_time, id, subject_and_level, student, chatId })=>{
                    // necessary fields are defined here to be passed to onSelect callbacks
                    const start = getDateFromDayAndTime(day, start_time)
                    const end = getDateFromDayAndTime(day, end_time)
                    return {
                    title: student.name.split(' ')[0],
                    start: start,
                    end: end,
                    allDay:false,
                    bSlotId: id,
                    day: day,
                    time: `${formatTime(start_time)} - ${formatTime(end_time)}`,
                    subject_and_level: subject_and_level.__str__,
                    student: student.name,
                    chatId: chatId,
                };
                })
            }).flat()
    
            setEvents(eventExtract)
        }
        
        availability&&getEvents()
    }, [availability])

    // submitting add or edit allocation form
    const onSubmit = async (e, toPost) => {
        e.preventDefault()
        switch (e.target.submit.value) {
            case 'Add':
                const addAvailability = await fetchPostAPI(`tutors/${userId}/availability`, toPost)
                setAvailability(addAvailability)
                setShowForm(false)
                break
            case 'Save':
                const editAvailability = await fetchPutAPI(`tutors/${userId}/availability`, toPost)
                setAvailability(editAvailability)
                setShowForm(false)
        }
    }
    // deleting a booked slot
    const onDeleteConfirmed = async (toDel) => {
        const fetchAvailability = await fetchDeleteAPI(`tutors/${userId}/availability/confirmedslots`, toDel)
        setAvailability(fetchAvailability)
        setShowEventInfo(false)
    }
    // deleting an availability allocation
    const onDeleteAvailability = async (toDel) => {
        const fetchAvailability = await fetchDeleteAPI(`tutors/${userId}/availability`, toDel)
        setAvailability(fetchAvailability)
        setShowEventInfo(false)
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
    const handleEventSelect = (item) => {
        // if booked slot is selected
        if (item.bSlotId) {
            setOnSelectDetails({
                day: item.day,
                student: item.student,
                subject_and_level: item.subject_and_level,
                time: item.time,
                bSlotId: item.bSlotId,
                chatId: item.chatId,
            })

            // toggling views
            toggleView('details')  
        }
        // if free time slot is selected
        else if (item.dayAndTimeId) {
            setOnSelectDetails({
                day: item.day,
                time: item.time,

                // edit fields
                dayAndTimeId: item.dayAndTimeId,
                start_time: item.start_time,
                end_time: item.end_time,
            })

            // toggling views
            toggleView('details')       
        }
    }
    
    const toggleView = (view) => {
        if (view === 'form') {
            setShowEventInfo(false)
            setShowForm(true)
        }
        else if (view === 'details') {
            setShowEventInfo(true)
            setShowForm(false)
        }
    }

    const blankSpace = () => {
        return(
            <div className="blank-space">
                <p>Click 'Add Availabilty' above to set your available time!</p>
            </div>
        )
    }

    return (
        <>
            <div className="allocation-requests-header">
                <ButtonSmall color={'green'} className={'add-availability'} text={'Add Availability'} onClick={()=>{
                    toggleView('form')
                    setEditFields('')
                }}/>
            </div>
            <div className="tutor-availability-main">

                <div className="tutor-availability-left">    
                    <BigCalendar 
                        backgroundEvents={backgroundEvents} 
                        events={events} 
                        handleEventSelect={handleEventSelect} 
                        maxMin={backgroundEvents.length?maxMin:undefined} 
                    />
                </div>

                <div>
                <div className="event-details">
                    
                    {(onSelectDetails.dayAndTimeId&&showEventInfo)&&
                        <>
                            <div className="event-details-header"><h2>Availability</h2></div>
                            <h2>{onSelectDetails.day}</h2>
                            <h3>{onSelectDetails.time}</h3>
                            <ButtonSmall text={'Edit'} onClick={()=>{
                                    setEditFields({
                                        dayAndTimeId: onSelectDetails.dayAndTimeId,
                                        day: onSelectDetails.day,
                                        start_time: onSelectDetails.start_time,
                                        end_time: onSelectDetails.end_time,
                                    })
                                    toggleView('form')
                                }
                            } />
                            <ButtonSmall color={'red'} text={'Delete'} onClick={()=>onDeleteAvailability({dayAndTimeId: onSelectDetails.dayAndTimeId})} />
                        </>}
                    {(onSelectDetails.student&&showEventInfo)&&
                        <>
                            <div className="event-details-header"><h2>Booked</h2></div>
                            <h2>{onSelectDetails.day}</h2>
                            <h3>{onSelectDetails.time}</h3>
                            <h4>{onSelectDetails.subject_and_level}</h4>
                            <p>with {onSelectDetails.student}</p>
                            <Link to="/chat" state={{ chatId: onSelectDetails.chatId }}>
                                <ButtonSmall Icon={<BsFillChatDotsFill style={{margin: 'auto 10px auto 0'}} />} text={'Chat with Parent'} color={'yellow'} />
                            </Link>
                            <ButtonSmall color={'red'} text={'Delete'} onClick={()=>onDeleteConfirmed({bSlotId: onSelectDetails.bSlotId})} />
                        </>
                        }
                        {showForm&&<AddOrEditDnT onSubmit={onSubmit} editFields={editFields} onCancel={()=>toggleView('details')} />}

                        {/* blank space placeholder */}
                        {(!showForm&&!showEventInfo)&&
                            blankSpace()
                        }


                        {/* On load default */}
                        {/* {(!showEventInfo&&!showForm)&&<h2>Add Availabity or Click on a Timeslot</h2>} */}
                    </div>
                    

                    <div className="requestlist-main">
                        <div className="requestlist-header"><h2>Requests</h2></div>
                        <div className={`requestlist-body`}>
                            {availability&&<Requests availability={availability} onAccept={onAccept} onDecline={onDecline} />}
                        </div>
                        {/* {requests&&requests.map((item, id) => <RequestIndie key={id} request={item} userId={userId} onAccept={onAccept} />)} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocationAndRequests