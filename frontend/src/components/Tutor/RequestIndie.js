import { formatTime } from "../../functions"
import ButtonSmall from "../Buttons/ButtonSmall"
import { fetchPutAPI } from "../../functions"


const RequestIndie = ({ request, day, onAccept }) => {

  

  return (
    <div className="request-details">
      <div className="request-details-left">
          <h3>
              {day}: {formatTime(request.start_time)} - {formatTime(request.end_time)}
          </h3>
          <h4>{request.subject_and_level.__str__}</h4>
          <p>Requested by Mr/Mrs {request.student.parent.username} for {request.student.name}</p>
      </div>

      <div className="request-details-right">
        <ButtonSmall text={'Accept'} onClick={()=>onAccept({bSlotId: request.id})} />
        <ButtonSmall text={'Decline'} />
      </div>
    </div>
  )
}

export default RequestIndie