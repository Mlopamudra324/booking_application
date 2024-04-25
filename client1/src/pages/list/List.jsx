import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import './list.css';
import { format } from 'date-fns'; //to transform the js date to rradable string we use date-fns.
import { DateRange } from 'react-date-range';
import { SearchItem } from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

function List() {

    const location = useLocation();
    console.log(location);

    const [destination, setDestination] = useState(location.state.destination)
    console.log(destination)
    const [dates, setDates] = useState(location.state.dates)
    // console.log(dates)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    //here we search using our backend api
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)
    console.log(data);
    //here we use backticks `` so we can add javascript code inside it.

    const handleClick = () => {
        reFetch()
    }
    return (
        <div>
            <Navbar />
            <Header type='list' />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>

                        <div className="lsItem">
                            <label>Destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="lsItem">
                            <label>Check-in-date</label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")} `}</span>

                            {openDate && (<DateRange
                                onChange={(item) => setDates([item.selection])}
                                minDate={new Date()}
                                ranges={dates}
                            />)}
                        </div>

                        <div className="lsItem">
                            <label >Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min Price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMin(e.target.value)}
                                        className="lsOptionInput" />
                                    {/* The event. target property returns the HTML element that triggered an event. By using this property we can get access to the element's properties and attributes. We can also use the event target Javascript property to modify the properties of an element. */}
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max Price <small>per night</small>
                                    </span>
                                    <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Adult
                                    </span>
                                    <input min={1} type="number" className="lsOptionInput" placeholder={options.adult} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input min={0} type="number" className="lsOptionInput" placeholder={options.chidlren} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Room
                                    </span>
                                    <input min={1} type="number" className="lsOptionInput" placeholder={options.room} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>

                    </div>

                    <div className="listResult">
                        {loading ? "Loading" : <>
                            {data.map(item => (
                                <SearchItem item={item} key={item._id} />
                            ))}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List