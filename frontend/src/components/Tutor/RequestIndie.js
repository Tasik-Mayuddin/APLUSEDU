import { formatTime } from "../../functions"

const RequestIndie = ({ request }) => {
  return (
    <div className="request-details">
        <h3>
            {request.day_and_time.day}: {formatTime(request.start_time)} - {formatTime(request.end_time)}
        </h3>
        <h4>{request.subject_and_level.__str__}</h4>
        <p>Requested by Mr/Mrs {request.student.parent.username} for {request.student.name}</p>
    </div>
  )
}

export default RequestIndie