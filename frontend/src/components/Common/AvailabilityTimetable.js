import { formatTime } from "../../functions"

const AvailabilityTimetable = ({ availability }) => {
    return (
        <>
            {/* get list of teacher's free time */}
            {availability.dayandtime_set.map((item, id)=>(
                <div key={id}>
                    <h3>{item.day} | {formatTime(item.start_time)} - {formatTime(item.end_time)}</h3>

                    {/* get inner list of approved bookedslots */}
                    {item.bookedslot_set.filter(bslot=>bslot.status==="approved").map((bslot, id)=>(
                        <p key={id}>{formatTime(bslot.start_time)} - {formatTime(bslot.end_time)}</p>
                    ))}
                </div>       
            ))}
        </>
    )
}

export default AvailabilityTimetable