

const DropdownMenu = ({ label, placeholder, list, onChange, oriSelected, extra_options }) => {
  return (
    <>
      <label>{label}</label>
      <select type="text" onChange={onChange} value={oriSelected} > 
        <option value='' disabled>{placeholder}</option>
        {list&&list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
        {extra_options&&extra_options.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  )
}

export default DropdownMenu