import ButtonSmall from "../Buttons/ButtonSmall"
import { useState, useEffect } from "react"
import { fetchAPI, fetchPostAPI, fetchPutAPI } from "../../functions"
import AddOrEditProfile from "./AddOrEditProfile"


const Profile = () => {
    const [profile, setProfile] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        const getProfile = async () => {
            const fetchProfile = await fetchAPI('tutor_profile')
            setProfile(fetchProfile)
        }
        getProfile()
    },[])

    // POST & PUT onSubmit functions
    const onSubmitPost = async (e, toPost) => {
        e.preventDefault()
        const data = await fetchPostAPI('tutor_profile', toPost)
        setProfile(data)
        setShowModal(false)
    }
    const onSubmitPut = async (e, toPost) => {
        e.preventDefault()
        const data = await fetchPutAPI('tutor_profile', toPost)
        setProfile(data)
        setShowModal(false)
    }

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
                {showModal&&<AddOrEditProfile editProfile = {profile} hideModal = {()=>setShowModal(false)} onSubmit={profile?onSubmitPut:onSubmitPost} />}
            </div>
        </>
    )
}

export default Profile