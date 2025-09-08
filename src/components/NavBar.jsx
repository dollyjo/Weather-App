import logo from '../assets/logo.png'
import search from '../assets/search.png'
import location from '../assets/location.png' 
import { useState } from 'react'
const NavBar = ({ onCitySearch, onLocationFetch}) => {
  
  const [searchQuery, setSearchQuery] = useState('')

    const handleSearchQuery = (e) => {
      setSearchQuery(e.target.value)
    }

    const handleSearchSubmit  = (e)=>
    {
      e.preventDefault()
      if (searchQuery) {
        onCitySearch(searchQuery) 
        setSearchQuery('')
      }
    }

    const handleLocationClick = () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos) =>{
            const { latitude, longitude} = pos.coords
            onLocationFetch( latitude, longitude )
            setSearchQuery('')
       
          },(error) =>{
            console.log(error)
            toast.error("Geolocation is not supported by your browser")
            
        }) 
      }
    }
  return (
    <div className="m-4">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* logo */}
            <img src={logo} alt="logo" className='w-20 select-none'/> 
            {/* search bar */}
            <form onSubmit={handleSearchSubmit} className='relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md'>
                <img src={search} alt='search' className='absolute left-3 w-3 h-3 text-gray-400 select-none'/>
                <input type='text' onChange={handleSearchQuery} placeholder='search for your preferred city...' 
                className='w-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 border-none rounded-lg outline-none'/>
                <button className="bg-[#050e1fde] text-white px-5 py-2" type='submit'>
                    Search
                </button>
            </form>
            <div onClick={handleLocationClick} className="flex items-center gap-3 px-3 py-1 font-medium text-sm text-white bg-green-500 rounded cursor-pointer">
              <img src={location} alt="location" className='w-5 h-5'/>
              <p>Current Location</p>
            </div>
        </div>
    </div>
  )
}

export default NavBar