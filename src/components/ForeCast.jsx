// import React from 'react'

const ForeCast = ({forecast}) => {

    // const forecast = [
    //     { temperature: "20°C", day: "Friday",    date: "1 Sep",    icon: "🌞"},
    //     { temperature: "22°C", day: "Saturday",  date: "2 Sep",    icon: "🌤️"},
    //     { temperature: "27°C", day: "Sunday",    date: "3 Sep",    icon: "⛅"},
    //     { temperature: "18°C", day: "Monday",    date: "4 Sep",    icon: "☁️"},
    //     { temperature: "16°C", day: "Tuesday",   date: "5 Sep",    icon: "☁️"},
    //     { temperature: "20°C", day: "Wednesday", date: "6 Sep",    icon: "🌨️"},
    //     { temperature: "20°C", day: "Thursday",  date: "7 Sep",    icon: "🌨️"},
    // ]
    // const hourlyforecast = [
    //     { degree: "26°C", icon: "🌤️", time:'12:00', WindSpeed: "3km/h"},
    //     { degree: "27°C", icon: "🌞", time:'15:00', WindSpeed: "2km/h"},
    //     { degree: "27°C", icon: "🌞", time:'18:00', WindSpeed: "2km/h"},
    //     { degree: "25°C", icon: "⛅", time:'21:00', WindSpeed: "3km/h"},
    //     { degree: "22°C", icon: "⛅", time:'00:00', WindSpeed: "3km/h"},
    // ]
  
    const dailyForeCast = forecast.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
        if(!acc.find(f => f.date === date)){
            acc.push({
                temperature: `${item.main.temp}°C`,
                day: new Date(item.dt * 1000).toLocaleDateString("en-EN", {weekday: 'short'}),
                date: date,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
            })
        } 
        return acc;
    }, []).slice(0, 5)

    const hourlyForeCast = forecast.slice(0, 5).map(item =>({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        degree: `${item.main.temp}°C`,
        windSpeed: `${item.wind.speed}`
    }))
    
    return (
<div className="flex flex-col xl:flex-row gap-4">
        <div className="justify-between xl:justify-center gap-6 md:gap-4 px-4 py-4 h-1/2 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white">
            <h2 className="flex items-center justify-center font-bold text-2xl">5 Days ForeCast;</h2>
            {dailyForeCast.map((cast, index)=>(
                <div key= {index} className="flex flex-row justify-between items-center p-2">
                <img src={cast.icon} alt="icon" className="select-none w-16 h-16"/>
                    <p className="font-bold px-8">{cast.temperature}</p>
                    <p className="font-bold items-center">{cast.day}, {cast.date}</p>
                </div>
            ))}
        </div>
        <div className="flex-grow h-auto px-4 py-10 bg-[#050e1fde] shadow-2xl shadow-black m-4 mt-10 rounded-lg text-white">
            <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Hourly Forecast</h1>
            <div className="flex flex-col sm:flex-row justify-around items-center gap-4 mt-10">
                {hourlyForeCast.map((hourCast, index)=>(
                    <div key={index} className="flex flex-col items-center gap-5 bg-[#050e1fde] rounded-lg p-2 w-28 text-center shadow-md">
                         <p className="font-medium text-sm">{hourCast.time}</p>
                         <img src={hourCast.icon} alt="hourcasticon" className="w-16 h-16 select-none"/>
                        <p>{hourCast.degree}</p>
                        <p>{hourCast.windSpeed} km/h</p>
                    </div>
                ))}
            </div>
        </div>  
    </div>
  )
}


export default ForeCast
