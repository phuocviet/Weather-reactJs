import React, { useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import './popup.css'
import axios from 'axios'

const Popup = ({setIsPopUp}) => {
    const [cities, setCities] = useState([])
    const [newcity, setNewcity] = useState("")
    const dataUrl = 'http://localhost:4000'
    useEffect(()=>{
        const fetchCities = async () => {
            await axios.get(`${dataUrl}/cities`)
            .then((res)=> setCities(res.data))
            .catch((err)=>console.error(err.message))
        }
        fetchCities()
    },[dataUrl])

    const handleSave = async () => {
        await axios.post(`${dataUrl}/cities`,{
            city: newcity
        })
        .then((res)=>setCities(res.data))
        .catch((err)=>console.error(err.message))
    }
    const handleAdd = async (e) => {
       
        const citiesList =([...cities, newcity])
        setCities(citiesList)
        
        await handleSave()
    }
    
    const handleChange = (e) => {
        setNewcity(e.target.value)
    }
    console.log(newcity);
  return (
    <div className='popupContainer'>
      <form onSubmit={handleAdd} className='formContainer'>
        <AiOutlineClose onClick={()=>setIsPopUp(false)}/>
        <h3>Add a city</h3>
        <div className='inputForm'>
            <label
                htmlFor='city'
            >City's name</label>
            <input 
                type='text' 
                required
                id='city'
                value={newcity}
                onChange={handleChange}
            />
            <button type='submit'>Add</button>
        </div>
        {/* <div className='citiesList'>
            {
                cities.map((city,i)=><span key={i}>{city}</span>)  
            }  
        </div> */}
        
    </form>  
    </div>
    
  )
}

export default Popup