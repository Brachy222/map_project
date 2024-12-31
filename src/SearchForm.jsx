import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './SearchForm.css'
import {useForm} from 'react-hook-form'
// import { MapContainer, TileLayer, useMap} from 'https://cdn.esm.sh/react-leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import { map } from 'leaflet'



function SearchForm() {

    let {register, handleSubmit, reset, formState:{errors, isValid}} = useForm({
        mode: "all"
    });
    
    function save(){}
    let [addresses, setAddress] = useState([]);
    let [choise, setChoise] = useState();
    let [choiseText, setChoiseText] = useState();
    let [isUserInput, setIsUserInput] = useState(false);
    const searchAdress = async(e) => {
        let query = e.target.value;
        let url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
        try{
            console.log("query: " + query);
            console.log("url: " + url);
            const response = await fetch(url);
            if(!response.ok){
                console.error('HTTP error', response.status); // הדפסת הסטטוס של התגובה
                throw new Error('Network response was not ok');
            }
            let data = await response.json()
            setAddress(data);
            console.log(JSON.stringify(data, null, 2));
            // createDivsWithAddress(adresses);
        }
        catch(err){
            console.error('There was a problem with the fetch operation:', err);
        }
    }
    const handleInputChange = (e) => {
        setChoiseText(e.target.value);
        setIsUserInput(true); // שונה על ידי המשתמש
    }
    const changeAddress = (address) =>{ //פונקציה שמשנה את הכתובת באינפוט
        setChoise(address);
        console.log(address)
        setChoiseText(address.display_name)
        setIsUserInput(false);
        setAddress([]);
    }
    return ( 
        <>
         <form id="searchInMap" noValidate onSubmit={handleSubmit(save)}>
            <input type="text" {...register("name",{
                required: {
                    value: true,
                    massage: "שם הוא שדה חובה"
                }
            })}
            placeholder='שם...'/>
            {errors.name&&<div style={{color:"red"}}>{errors.name.massage}</div>}
            <input type="text" {...register("address",{})}
            placeholder='כתובת...'/>
            <input type="text" {...register("phone",{})}
            placeholder='טלפון...'/>
            <input type="email" {...register("email",{
                required:{
                    value:true,
                    massage: "מייל הוא שדה חובה"
                },
                pattern: { 
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                    message: "כתובת המייל אינה תקינה" // הודעת שגיאה מותאמת אישית
                }
            })}
            placeholder='מייל...'/>
            {errors.email&&<div style={{color:"red"}}>{errors.email.message}</div>}

            <div id="checks">
            <label>
                <input type="checkBox" {...register("reqConnection",{})}/>
                נדרש חיבור לאינטרנט

            </label>
            <label>
                <input type="checkBox" {...register("reqkitchen",{})}/>
                נדרש מטבח             

            </label>
            <label>
                <input type="checkBox" {...register("reqCoffee",{})}/>
                נדרשת מכונת קפה

            </label>
            </div>
            <input type="number" {...register("sumRooms",{})}
            placeholder='מספר חדרים'/>
            <input type="number" {...register("distance",{})}
            placeholder='מרחק אפשרי'/>
            <div id = "addressParrent">
                <input type="text" {...register("adress", {})}
                placeholder='כתובת לחיפוש'
                onChange={(e) => {
                    searchAdress(e);
                    handleInputChange(e);
                }} value={choiseText}/>
                {addresses.map(address => (
                    <div className='optionsAdresses' id={address.place_id} key={address.place_id} object = {address}
                    onClick={()=> changeAddress(address)}>{address.display_name}</div>
                ))}
            </div>
           
            {/* <select {...register("adressesSelect",{})}>
                {adresses.map(address => {
                    <option key={address.place_id}>{address.display_name}</option>
                })}
            </select> */}
            <input type="submit" disabled={!isValid} value={"חפש"}/>
        </form>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>   
        </MapContainer>
        </>
     );
}

export default SearchForm;