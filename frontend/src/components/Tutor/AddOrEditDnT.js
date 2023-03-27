import DropdownMenu from "../Inputs/DropdownMenu"
import TimeInput from "../Inputs/TimeInput"
import { useState, useEffect } from "react"
import ButtonSmall from "../Buttons/ButtonSmall"

const AddOrEditDnT = ({ editFields, onSubmit, onCancel }) => {

    // form fields
    const [day, setFormDay] = useState('')
    const [start_time, setStartTime] = useState('')
    const [end_time, setEndTime] = useState('')
    const [idEdit, setIdEdit] = useState('')

    useEffect(()=>{
        setFormDay(editFields.day)
        setStartTime(editFields.start_time)
        setEndTime(editFields.end_time)
        setIdEdit(editFields.dayAndTimeId)
    }, [editFields])

    return (
        <>
            <form onSubmit={(e)=>onSubmit(e, {idEdit, day, start_time, end_time})}>
                <div className="form-control" style={{marginTop: '0'}}>
                    <DropdownMenu 
                        label = {"Day: "} 
                        placeholder = {"Select Day"} 
                        extra_options = {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                        onChange={(e) => setFormDay(e.target.value)} 
                        oriSelected={day}
                    />
                </div>
                <div className="form-control">
                    <TimeInput label={"Start Time:"} name={"start_time"} onChange={(e)=>setStartTime(e.target.value)} defaultValue = {start_time} />
                </div>
                <div className="form-control">
                    <TimeInput label={"End Time:"} name={"end_time"} onChange={(e)=>setEndTime(e.target.value)} defaultValue = {end_time} />
                </div>
                <input type='submit' name="submit" value={idEdit?"Save":"Add"} className="btn-small btn-green btn-submit"/>
                <ButtonSmall text={'Cancel'} onClick={onCancel} />
            </form>
            
        </>
    )
}

export default AddOrEditDnT