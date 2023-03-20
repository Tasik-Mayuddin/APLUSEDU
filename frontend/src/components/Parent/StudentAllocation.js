import { formatTime } from "../../functions"


const StudentAllocation = ({ allocationDetails }) => {
	

  return (
    <div className={`student-allocation${allocationDetails.status==='approved'?` student-allocation-approved`:''}`} >
      <h3>{allocationDetails.day}, {formatTime(allocationDetails.start_time)} - {formatTime(allocationDetails.end_time)}</h3>
      <h4>{allocationDetails.subject} with Teacher {allocationDetails.tutor}</h4>
			<p>
				({allocationDetails.status})
			</p>
    </div>
  )
}

export default StudentAllocation