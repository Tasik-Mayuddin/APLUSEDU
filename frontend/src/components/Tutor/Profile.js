import ButtonSmall from "../Buttons/ButtonSmall"
import { useState, useEffect } from "react"
import { fetchAPI } from "../../functions"
import AddOrEditProfile from "./AddOrEditProfile"


const Profile = () => {
    const [profile, setProfile] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        const getProfile = async () => {
            const fetchProfile = await fetchAPI('tutor_profile')
            setProfile(fetchProfile)
        }
        getProfile()
    },[])

    return (
        <>
            <div>
                <div className="profile-header">
                    <h1>My Profile</h1>
                    <ButtonSmall text={'Edit Profile'} onClick={()=>setShowModal(true)} />
                </div>
                <div className="profile-details">
                    <h2>About me</h2>
                    <p>{profile.summary}</p>
                    <h2>Qualifications</h2>
                    <h3>Years of Experience: {profile.experience_years}</h3>
                    <h3>University: {profile.education}</h3>
                    <h3>Occupation: {profile.occupation}</h3>
                </div>
                {showModal&&<AddOrEditProfile editProfile = {profile} hideModal = {()=>setShowModal(false)} />}
            </div>
        </>
    )
}

export default Profile