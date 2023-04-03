import RequestIndie from "./RequestIndie"
import React, { useEffect, useState } from "react"


const Requests = ({ availability, onAccept, onDecline }) => {

    const [blankRequest, setBlankRequest] = useState(true)

    useEffect(()=>{
        setBlankRequest(true)
        availability.dayandtime_set.forEach(({ bookedslot_set }) => {
            bookedslot_set.filter(bslot=>bslot.status==="pending").length&&setBlankRequest(false)
        })
    }, [availability, onAccept, onDecline])

    const noRequests = () => {
        return (
            <div className="no-requests">
                <p>Your requests will show up here!</p>
            </div>
        )
    }

    return (                
        <>
                {/* get list of teacher's free time */}
                {availability.dayandtime_set.map((item, id)=>{
                    return (
                        <React.Fragment key={id}>
                            {/* get inner list of pending bookedslots */}
                            {item.bookedslot_set.filter(bslot=>bslot.status==="pending").map((bslot, id)=>(
                                    <RequestIndie key={id} request={bslot} day={item.day} onAccept={onAccept} onDecline={onDecline} />
                                ))
                            }
                        </React.Fragment>       
                    )})
                }
                {blankRequest&&noRequests()}
        </>
    )
}

export default Requests