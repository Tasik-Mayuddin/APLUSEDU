import { useState } from 'react'
const AddOrEditChild = () => {
	const [name, setName] = useState('')
	const [level, setLevel] = useState('')
	const [subjects, setSubjects] = useState('')

  return (
    <div className="popup-block">
        <form className="add-edit-form">
            <div className="form-control">
                <label>Name</label>
                <input type="text" placeholder="Insert your child's name" onChange={(e) => e.target.value} />
            </div>
            <div className="form-control">
                <label>Level</label>
                <select type="select" placeholder="Select level" onChange={(e) => e.target.value} />
            </div>
						<div className="form-control">
                <label>Subjects</label>
                <input type="text" placeholder="Insert your child's name" onChange={(e) => e.target.value} />
            </div>
        </form>
    </div>
  )
}

export default AddOrEditChild