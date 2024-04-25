import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../components/mailList/MailList';
import { Footer } from '../../components/footer/Footer';
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext';
import moment from "moment";
import { AuthContext } from '../../context/AuthContext';
import { Reserve } from '../../components/reserve/Reserve';

function Hotel() {
    const location = useLocation();
    console.log(location)
    const id = location.pathname.split("/")[2]
    // console.log(id)
    //The split() method splits a string into an array of substrings. The split() method returns the new array. The split() method does not change the original string. If (" ") is used as separator, the string is split between words.

    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)


    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);
    console.log(data);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const { dates, options } = useContext(SearchContext);
    console.log(dates);

    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {

        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        console.log(timeDiff)
        const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
        console.log(diffDays)

        return diffDays;
    }
    const days = dayDifference(dates[0].startDate, dates[0].endDate)


    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true)
    }
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }

        setSlideNumber(newSlideNumber)
    }

    const handleClick = () => {
        if (user) {
            setOpenModal(true)
        } else {
            navigate("/login")
        }
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />

            {loading ? ("loading") : (
                <div className="hotelContainer">
                    {open && <div className="slider">
                        <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
                        <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")} />
                        <div className="sliderWrapper">
                            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")} />
                    </div>
                    }
                    <div className="hotelWrapper">
                        <button className="bookNow">Reserve Or Book Now!</button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocation} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">
                            {data.distance}
                        </span>
                        <span className="hotelPriceHighlight">
                            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi.
                        </span>

                        <div className="hotelImgs">
                            {data.photos?.map((photo, i) => (
                                //this ? means if there is a question array
                                <div className="hotelImgWrapper">
                                    <img src={photo} onClick={() => handleOpen(i)} alt="" className="hotelImg" />
                                </div>
                            ))}
                        </div>

                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">
                                    {data.des}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days} - night stay!</h1>
                                <span>
                                    Located in the Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim inventore, nisi ipsa molestiae maiores magni.
                                </span>
                                <h2>
                                    <b>$ {days * data.cheapestPrice * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or Book Now!</button>
                            </div>
                        </div>
                    </div>

                    <MailList />
                    <Footer />
                </div>
            )}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel