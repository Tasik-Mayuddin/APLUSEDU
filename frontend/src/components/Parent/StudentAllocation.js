import { Link } from "react-router-dom"
import { formatTime } from "../../functions"
import ButtonSmall from "../Buttons/ButtonSmall"
import { BsFillChatDotsFill } from "react-icons/bs";

const StudentAllocation = ({ allocationDetails }) => {
	

  return (
    <div className={`student-allocation${allocationDetails.status==='approved'?` student-allocation-approved`:''}`} >
      <h3>{allocationDetails.day}, {formatTime(allocationDetails.start_time)} - {formatTime(allocationDetails.end_time)}</h3>
      <h4>{allocationDetails.subject} with Teacher {allocationDetails.tutor}</h4>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <p style={{margin: 'auto 0'}}>
          ({allocationDetails.status})
        </p>
        <Link to="/chat" state={{ chatId: allocationDetails.chatId }}>
          <ButtonSmall Icon={<BsFillChatDotsFill style={{margin: 'auto 10px auto 0'}} />} text={'Chat Now'} color={'yellow'} />
        </Link>
      </div>
    </div>
  )
}

export default StudentAllocation