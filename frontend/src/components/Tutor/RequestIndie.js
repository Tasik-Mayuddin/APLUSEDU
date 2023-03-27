import { formatTime } from "../../functions"
import ButtonSmall from "../Buttons/ButtonSmall"
import { fetchPutAPI } from "../../functions"
import { BsFillChatDotsFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const RequestIndie = ({ request, day, onAccept, onDecline }) => {

  

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
        <Link to="/chat" state={{ chatId: request.chatId }}>
          <ButtonSmall Icon={<BsFillChatDotsFill style={{margin: 'auto 10px auto 0'}} />} text={'Chat'} color={'yellow'} />
        </Link>
        <ButtonSmall color={'green'} text={'Accept'} onClick={()=>onAccept({bSlotId: request.id})} />
        <ButtonSmall color={'red'} text={'Decline'} onClick={()=>onDecline({bSlotId: request.id})} />
      </div>
    </div>
  )
}

export default RequestIndie