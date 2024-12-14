import React from 'react'

const FilterProfile = ({option , label ,  setOptionValue, value}) => {
    console.log(option);
    
  return (
    
    <div className="w-1/2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
       {label}
      </label>
      <select 
      className='w-3/4 h-10 border border-solid border-gray-500 rounded-lg'
      value={value}
    onChange={(e) => setOptionValue(e.target.value)}
      >
        <option>{label == 'filter by role' ? 'select a role' : 'select a location'}</option>
        {
          option?.map((item) => {
            let option = label == 'filter by role' ? item.company.title : item.address.state
           return <option key={item.id} value={option}> {option}</option> 
      })
        }
      </select>
    </div>
 
  )
}

export default FilterProfile