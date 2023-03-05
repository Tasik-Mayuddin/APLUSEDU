import DropdownMenu from "../Inputs/DropdownMenu"
import { useState } from "react"
import TimeInput from "../Inputs/TimeInput"

const TutorAvailability = ({ availability, tutor_id, onRequest }) => {
    const [day, setFormDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    

    return (
        <div className="tutor-availability">
            <h1>{availability.username}</h1>
            <h2>Available times: </h2>

                {/* get list of teacher's free time */}
                {availability.dayandtime_set.map((item, id)=>(
                    <div key={id}>
                        <h3>{item.day} | {item.start_time} - {item.end_time}</h3>

                        {/* get inner list of approved bookedslots */}
                        {item.bookedslot_set.filter(bslot=>bslot.status==="approved").map((bslot, id)=>(
                            <p key={id}>{bslot.start_time} - {bslot.end_time}</p>
                        ))}
                    </div>       
                ))}


            <form onSubmit={(e)=>onRequest(e, {tutor_id, day, startTime, endTime})}>
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
                <input type='submit' value="Request" className="btn btn-block"/>
            </form>
        </div>
    )
}

export default TutorAvailability