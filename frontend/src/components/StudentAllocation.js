

const StudentAllocation = ({ allocationDetails }) => {
	
  return (
    <div>
			<p>
				{allocationDetails.tutor}, {allocationDetails.subject}| Day: {allocationDetails.day}, {allocationDetails.start_time} - {allocationDetails.end_time} ({allocationDetails.status})
			</p>
    </div>
  )
}

export default StudentAllocation