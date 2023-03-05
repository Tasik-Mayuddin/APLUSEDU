
const TimeInput = ({ label, name, onChange }) => {
  return (
    <>
        <label htmlFor={`id_${name}`}>{label}</label>
        <input type="time" name={name} required id={`id_${name}`} onChange={onChange} />
    </>
  )
}

export default TimeInput