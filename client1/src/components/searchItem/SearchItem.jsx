import './searchItem.css'
import React from 'react';
import { Link } from 'react-router-dom'

export const SearchItem = ({ item }) => {
    return (
        <div className="searchItem">
            <img src={item.photos[0]} alt="" className="searchImg" />

            <div className="searchItemDesc">
                <h1 className="searchItemTitle">{item.name}</h1>
                <span className="searchItemDistance">{item.distance} from center</span>
                <span className="searchItemTaxiOp">Free Airport Taxi</span>
                <span className="searchItemSubTitle">
                    Studio Apartment with Air conditioning
                </span>
                <span className="searchItemFeatures">
                    {item.desc}
                </span>
                <span className="searchItemCancelOp">Free cancellation</span>
                <span className="searchItemCancelOpSubtitle">
                    You can cancel later, so look in this great price today!
                </span>
            </div>

            <div className="searchItemDetails">
                {item.rating && <div className="searchItemRating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div>}


                <div className="searchItemDetailTexts">
                    <span className="searchItemPrice">${item.cheapestPrice}</span>
                    <span className="searchItemTaxOp">Includes Taxes and fees </span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className='searchItemCheckButton'>See availability</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}
