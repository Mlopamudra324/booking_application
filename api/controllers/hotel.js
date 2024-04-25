import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

//create
//ASYNC:-
//Async simply allows us to write promises-based code as if it was synchronous and it checks that we are not breaking the execution thread.
//Async functions will always return a value. It makes sure that a promise is returned and if it is not returned then JavaScript automatically wraps it in a promise which is resolved with its value.
// AWAIT:-
// Await function is used to wait for the promise. It could be used within the async block only.
// It makes the code wait until the promise returns a result.
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }

}

//update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

//delete
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        next(err)
    }
}

//get
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id,
        )
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

//getHotel
export const getAllHotel = async (req, res, next) => {
    //to add minimum and maximum price  we add these below code
    const { min, max, limit, ...others } = req.query
    //req. query is an object containing a set of key-value pairs representing the query parameters of the URL. This object is used to get the values of query parameters, which are appended to the end of the URL after a question mark.
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: {
                $gt: parseInt(min) | 1, $lt: parseInt(max) || 999
            }
        }).limit(parseInt(req.query.limit))

        res.status(200).json(hotels)


        // const { featured, min, max } = req.query;

        // let query = {};

        // if (featured) {

        //     query.featured = featured;

        // }

        // if (min && max) {

        //     query.cheapestPrice = { $gt: parseInt(min), $lt: parseInt(max) };

        // }

        // const hotels = await Hotel.find(query).limit(parseInt(req.query.limit));

        // res.status(200).json(hotels);


    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        })) //here we want to find multiple items so we use Promis.all()
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {
    // here we not use  const cities = req.query.cities.split(",") because there there is infinite number of citites but here we have limited 5 properties
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ])
    } catch (err) {
        next(err)
    }

}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        })) //here we want to find multiple items so we use Promis.all()
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}