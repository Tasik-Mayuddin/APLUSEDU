import RequestIndie from "./RequestIndie"
import React from "react"


const Requests = ({ availability, onAccept }) => {
  return (
    <>
            {/* get list of teacher's free time */}
            {availability.dayandtime_set.map((item, id)=>(
                <React.Fragment key={id}>
                    {/* get inner list of pending bookedslots */}
                    {item.bookedslot_set.filter(bslot=>bslot.status==="pending").map((bslot, id)=>(
                        <RequestIndie key={id} request={bslot} day={item.day} onAccept={onAccept} />
                    ))}
                </React.Fragment>       
            ))}
        </>
  )
}

export default Requests