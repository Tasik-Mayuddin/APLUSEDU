
const TimeInput = ({ label, name, onChange, defaultValue }) => {
  return (
    <>
        <label htmlFor={`id_${name}`}>{label}</label>
        <input type="time" name={name} required id={`id_${name}`} onChange={onChange} defaultValue={defaultValue} />
    </>
  )
}

export default TimeInput