

const DropdownMenu = ({ label, placeholder, list, onChange, oriSelected }) => {
  return (
    <>
      <label>{label}</label>
      <select type="text" onChange={onChange} value={oriSelected} > 
        <option value='' disabled>{placeholder}</option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default DropdownMenu