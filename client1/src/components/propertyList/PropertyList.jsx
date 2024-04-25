import React from 'react';
import './propertyList.css';
import useFetch from '../../hooks/useFetch';

export const PropertyList = () => {

    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByType");
    // console.log(data);

    const images = [
        "https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_640.jpg",
        "https://cdn.pixabay.com/photo/2017/01/30/10/03/book-2020460_640.jpg",
        "https://cdn.pixabay.com/photo/2014/02/08/04/55/maldives-261506_640.jpg",
        "https://cdn.pixabay.com/photo/2020/07/04/15/31/lamppost-5369945_640.jpg",
        "https://cdn.pixabay.com/photo/2019/03/26/16/08/landscape-4083012_640.jpg"
    ]

    return (
        <div className="pList">
            {loading ? (
                "Loading"
            ) : <>
                {data && images.map((img, i) =>
                    //if we are using map() , then not forget to use unique key
                    <div className="pListItem" key={i}>
                        <img src={img} alt="" className="pListImg" />

                        <div className="pListTitles">
                            {/* here we add ? to make sure the data array is not empty */}
                            <h1>{data[i]?.type}</h1>
                            <h2>{data[i]?.count} {data[i]?.type}</h2>
                        </div>
                    </div>)}

            </>}
        </div >
    )
}
