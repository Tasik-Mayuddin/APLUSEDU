import { useState, useEffect } from "react"

const CheckboxMultiple = ({ label, name, list, setState }) => {

  const [selectedOptions, setSelectedOptions] = useState([])
  

  // When user selects an option, trigger the setEffect
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, selectedOption])
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== selectedOption))
    }
  }

  useEffect(() => {
    setState(selectedOptions)
  }, [selectedOptions])

  return (
    <>
        <label>{label}</label>
        {list.map((item, id) => (
                <div key={item.id}>
                  <label htmlFor={"id_"+name+"_"+id}>{item.name} 
                      <input type="checkbox" id={"id_"+name+"_"+id} name={name} value={item.id} onChange={handleOptionChange} />
                  </label>
                  <br/>
                </div>
            ))}
    </>
  )
}

export default CheckboxMultiple