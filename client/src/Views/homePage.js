import React, { useEffect, useState } from 'react'
import { AiFillBell, AiOutlinePlus} from 'react-icons/ai'
import { GiDrop } from 'react-icons/gi'
import { FaTemperatureLow} from 'react-icons/fa'
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md'
import Sidebar from '../Components/sidebar/sidebar'
import D3Chart from '../Components/chart/chart'
import axios from 'axios'
import './home.css'
import Popup from '../Components/popup/popup'

const HomePage = () => {
  const initialCity = 'Saigon'
  const [city, setCity] = useState(initialCity)
  const [citiesList, setCitiesList] = useState([])
  const [currentWeather, setCurrentWeather] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isPopUp, setIsPopUp] = useState(false)
  const dataUrl = 'http://localhost:4000'
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const key = 'a44e09bbe7b0a90f29ee1c37758ded19';
  const iconApi = 'http://openweathermap.org/img/w'
  useEffect(()=>{
    const fetchingWeather = () =>{
      axios.get(`${apiUrl}?q=${city}&appid=${key}`)
      .then((res)=> {
        setCurrentWeather(res.data)
      })
      .then(()=> {
        axios.get(`${dataUrl}/cities`)
        .then((res)=>setCitiesList(res.data))
      })
      .catch((err)=>console.log(err.message))
    }
    fetchingWeather()

  },[city,apiUrl,key])
  
  //toogleSearch
  const toogleSearch = () => {
    setIsOpen(!isOpen)
  }

  const ChosingCity = (city) => {
    setCity(city)
  }
  const handlePopUp = () =>{
    setIsPopUp(true)
  }
  const icon = currentWeather?.weather[0]?.icon
  const mainweather = currentWeather?.weather[0]?.main
  const currentTemp = currentWeather?.main?.temp / 10
  const temp = currentTemp.toFixed(2)
  const humidity =currentWeather?.main?.humidity
  
  return (
    <div className='background'>
      <div className='topContainer'>
        <nav className='navbar'>
          <div className='sidebar'><Sidebar/></div>
          <div className='locationContent'>
            <p>myENV</p>
            {city}
            {isOpen ?
            <svg 
            className='dropdownButton' 
            onClick={toogleSearch}>
              <MdKeyboardArrowUp/>
            </svg>
            :
            <svg 
            className='dropdownButton' 
            onClick={toogleSearch}>
              <MdKeyboardArrowDown/>
            </svg>
            }
            {isOpen && 
              <ul className='citiesList'>
                {citiesList.map((city,index)=>
                  <li key={index} onClick={()=>ChosingCity(city.city)}>
                    {city.city}
                  </li>
                )}  
              </ul>
          }  
          </div>
          <button className='notificate'>
            <AiFillBell/>
          </button>
        </nav>
        
        {isPopUp && <div className='overlay'></div>}
          {isPopUp && 
          <div className='popup'>
            <Popup setIsPopUp={setIsPopUp}/>
          </div>}
        {currentWeather ? 
        <div className='body'>
          <div className='weatherHeader'>
            <img alt='weather' src={`${iconApi}/${icon}.png`}/>
            <div className='detail'>
              <h2>{mainweather}</h2>
              <div className='subDetail'>
                <p><FaTemperatureLow/> {temp}°C</p>
                <p><GiDrop/> {humidity}%</p>
              </div>
            </div>
          </div>
          
        </div>
        :
        <div className='failingFetch'>None data</div>
        }
        <div className='footer'>
          <div>
            <label>PSI</label>
            <h4 className='psiContent'>33</h4>
            <label>Good</label>
          </div>
          <div>
            <label>Rain</label>
            <h4>0</h4>
            <label>mm</label>
          </div>
          <div>
            <label>DENGUE</label>
            <span className='rateRound'></span>
          </div>  
          <div>
            <button 
              className='addButton'
              onClick={handlePopUp}
            ><AiOutlinePlus/></button>
            <label>Add</label>
          </div>
        </div>
      </div>
      <div className='chartContainer'>
        <D3Chart/>
      </div>
    </div>
  )
}

export default HomePage