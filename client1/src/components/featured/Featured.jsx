import React from 'react';
import './featured.css';
import useFetch from '../../hooks/useFetch';

export const Featured = () => {
    // // console.log(data)
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=delhi,bangalore,agra,bhubaneswar"); //inside of this useFetch() hook we write our api end point.
    // console.log(data)

    return (
        <div className="featured">
            {loading ? "loading please wait" : (
                <>
                    <div className="featuredItem">
                        <img src="https://cdn.pixabay.com/photo/2020/02/02/17/23/travel-4813653_640.jpg" alt="" className="featuredImg" />

                        <div className="featuredTitles">
                            <h1>Delhi</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src='https://cdn.pixabay.com/photo/2013/06/23/10/19/thanjavur-140697_640.jpg' alt="" className="featuredImg" />

                        <div className="featuredTitles">
                            <h1>Bangalore</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://cdn.pixabay.com/photo/2020/01/31/14/27/taj-mahal-sunset-4808233_640.jpg" alt="" className="featuredImg" />

                        <div className="featuredTitles">
                            <h1>Agra</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://cdn.pixabay.com/photo/2020/01/31/14/27/taj-mahal-sunset-4808233_640.jpg" alt="" className="featuredImg" />

                        <div className="featuredTitles">
                            <h1>Bhubaneswar</h1>
                            <h2>{data[3]} properties</h2>
                        </div>
                    </div>
                </>)

            }
        </div>
    )
}
