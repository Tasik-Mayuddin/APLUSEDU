
import { useState, useEffect } from 'react'

const AddOrEditProfile = ({ onSubmit, editProfile, hideModal }) => {
    const [summary, setSummary] = useState(editProfile?editProfile.summary:'')
    const [initial_experience, setInitialExperience] = useState(editProfile?editProfile.initial_experience:'')
    const [education, setEducation] = useState(editProfile?editProfile.education:'')
    const [occupation, setOccupation] = useState(editProfile?editProfile.occupation:'')


    // get edit date
    const dateCreated = new Date(editProfile&&editProfile.created_at)
    const month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][dateCreated.getMonth()];
    const dateCreatedDisp = `${month}  ${dateCreated.getFullYear()}`
    return (
        <>
        <div className="overlay" onClick={hideModal}></div>
        <div className="profile-popup">
            <form className="add-edit-form" onSubmit={(e)=>onSubmit(e, {summary})}>
                <div className="form-control">
                    <label>About me:</label>
                    <input type="text" placeholder="Tell us about yourself" onChange={(e) => setSummary(e.target.value)} defaultValue={summary} />
                </div>
                <div className="form-control">
                    
                    <label>Years of experience: {editProfile&&`(as of ${dateCreatedDisp})`}</label>
                    <input type="text" placeholder="Insert years of experience" onChange={(e) => setInitialExperience(e.target.value)} defaultValue={initial_experience} />
                </div>
                <div className="form-control">
                    <label>Education:</label>
                    <input type="text" placeholder="Which university did you graduate from?" onChange={(e) => setEducation(e.target.value)} defaultValue={education} />
                </div>
                <div className="form-control">
                    <label>Occupation:</label>
                    <input type="text" placeholder="What is your occupation?" onChange={(e) => setOccupation(e.target.value)} defaultValue={occupation} />
                </div>
                <input type='submit' value={editProfile?'Save Changes':'Save'} className="btn btn-block"/>
            </form>
        </div>
        </>
    )
}

export default AddOrEditProfile