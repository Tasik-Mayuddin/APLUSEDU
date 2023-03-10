import { useState, useEffect } from "react"

const CheckboxMultiple = ({ label, name, list, setState, oriChecked, valueName }) => {

  const [selectedOptions, setSelectedOptions] = useState(oriChecked?oriChecked:[])
  

  // When user selects an option, trigger the setEffect
  const handleOptionChange = (e) => {
    const selectedOption = Number(e.target.value)
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, selectedOption])
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== selectedOption))
    }
  }

  useEffect(() => {
    setState(selectedOptions)
  }, [selectedOptions, setState])

  return (
    <>
        <label>{label}</label>
        {list.map((item, id) => (
                <div key={item.id} className={'form-control-checkbox'}>
                  <label htmlFor={"id_"+name+"_"+id}>{item.name} 
                      <input type="checkbox" id={"id_"+name+"_"+id} name={name} value={valueName?item.name:item.id} onChange={handleOptionChange} defaultChecked={oriChecked.includes(item.id)} />
                  </label>
                </div>
            ))}
    </>
  )
}

export default CheckboxMultiple