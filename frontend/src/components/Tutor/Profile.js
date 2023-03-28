import ButtonSmall from "../Buttons/ButtonSmall"
import { useState, useEffect } from "react"
import { fetchAPI, fetchPostAPI, fetchPutAPI, backendDir } from "../../functions"
import AddOrEditProfile from "./AddOrEditProfile"


const Profile = () => {
    const [profile, setProfile] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [pic, setPic] = useState('')


    useEffect(()=>{
        const getProfile = async () => {
            const fetchProfile = await fetchAPI('tutor_profile')
            setProfile(fetchProfile)
        }
        getProfile()
    },[])

    useEffect(()=>{
        if (pic) {
            const submitPic = async () => {
                const uploadData = new FormData();
                uploadData.append('profile_picture', pic, pic.name);
                const fetchProfile = await fetchPutAPI('tutor_profile_picture', uploadData, true)
                setProfile(fetchProfile)
            }
            submitPic()
        }
    }, [pic])

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
                    <label htmlFor="file-input" className="image-input-label">
                        {profile&&<div className="image-input-preview" style={{backgroundImage: `url(${backendDir}${profile.profile_pic_url})`}}></div>}
                    </label>
                    <input id="file-input" type="file" onChange={(e) => {
                        setPic(e.target.files[0])
                    }} className="hidden-input" />
                    
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