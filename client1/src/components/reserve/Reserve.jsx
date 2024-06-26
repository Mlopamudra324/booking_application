import React, { useContext, useState } from 'react';
import axios from 'axios'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom'

export const Reserve = ({ setOpen, hotelId }) => { //here we taking setOpen as prop because in this component we will be able to close our modal again and this hotelId we are going to fetch our rooms in this page
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)
    // console.log(data);

    const { dates } = useContext(SearchContext);
    // console.log(dates)

    const getDatesInRange = (startDate, endDate) => { //here we range the selected dates from start date to end date
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return dates
    }
    const allDates = (getDatesInRange(dates[0].startDate, dates[0].endDate));
    const navigate = useNavigate()

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value;

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value)) // if it is checked take the previous rooms additionally add here one more id and if it is not checked we are filter our previous selectedrooms  and we are pull our room id from the selected rooms.
        //so in this filter method for each itemwe check if item does not equal our value which is room id they are stay. if it is equal we are move out this value
    }
    // console.log(selectedRooms)

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`http://localhost:8800/api/rooms/available/${roomId}`
                        , {
                            dates: allDates,
                        });
                    // console.log(res)
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) { }
    };

    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faFileCircleXmark} className="rClose" onClick={() => setOpen(false)} />

                <span>Select your rooms: </span>
                {data.map((item) =>
                (<div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">max people: <b>{item.maxPeople}</b></div>
                        <div className="rPrice">{item.price}</div>
                    </div>

                    <div className="rSelectRooms">

                        {item.roomNumbers.map(roomNumber => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input
                                    type='checkbox'
                                    value={roomNumber._id}
                                    onChange={handleSelect}
                                    disabled={!isAvailable(roomNumber)}
                                />
                            </div>
                        ))}
                    </div>



                </div>
                ))}

                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>

        </div>
    )
}
