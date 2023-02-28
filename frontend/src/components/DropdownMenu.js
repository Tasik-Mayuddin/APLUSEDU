

const DropdownMenu = ({ label, placeholder, list, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <select type="text" onChange={onChange} defaultValue={'DEFAULT'} > 
        <option value="DEFAULT" disabled>{placeholder}</option>
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