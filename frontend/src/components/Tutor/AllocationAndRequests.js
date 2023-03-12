import { useState, useEffect } from "react"
import { fetchAPI, fetchPostAPI } from "../../functions"
import AvailabilityTimetable from "../Common/AvailabilityTimetable"
import DropdownMenu from "../Inputs/DropdownMenu"
import TimeInput from "../Inputs/TimeInput"
import RequestIndie from "./RequestIndie"

const AllocationAndRequests = ({ userId }) => {

    // fetch API data
    const [availability, setAvailability] = useState('')
    const [requests, setRequests] = useState('')

    // form fields
    const [day, setFormDay] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')


    useEffect(()=>{
        const getAvailability = async () => {
            const fetchAvailability = await fetchAPI(`tutors/${userId}/availability`)
            setAvailability(fetchAvailability)
        }
        const getRequests = async () => {
            const fetchRequests = await fetchAPI(`tutors/${userId}/request`)
            setRequests(fetchRequests)
        }

        getAvailability()
        getRequests()
    }, [userId]) 

    const onSubmit = async (e, toPost) => {
        e.preventDefault()
        const fetchAvailability = await fetchPostAPI(`tutors/${userId}/availability`, toPost)
        setAvailability(fetchAvailability)
    }

    

    return (
        <>
            <div className="tutor-availability-main">

                <div>
                    <h2>Available times: </h2>
                    {availability&&<AvailabilityTimetable availability={availability} />}
                    
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
                        {requests&&requests.map((item, id) => <RequestIndie key={id} request={item} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocationAndRequests