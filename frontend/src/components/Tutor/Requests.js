import RequestIndie from "./RequestIndie"
import React from "react"


const Requests = ({ availability, onAccept, onDecline }) => {
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
                {availability.hasOwnProperty("dayandtime_set")?availability.dayandtime_set.map((item, id)=>(
                    <React.Fragment key={id}>
                        {/* get inner list of pending bookedslots */}
                        {console.log(item.bookedslot_set.filter(bslot=>bslot.status==="pending"))}
                        {item.bookedslot_set.filter(bslot=>bslot.status==="pending").length?
                            item.bookedslot_set.filter(bslot=>bslot.status==="pending").map((bslot, id)=>(
                                <RequestIndie key={id} request={bslot} day={item.day} onAccept={onAccept} onDecline={onDecline} />
                            )):
                            noRequests()
                        }
                    </React.Fragment>       
                )):
                noRequests()
                }
            </>
    )
}

export default Requests