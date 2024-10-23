import React from 'react'
import { Review } from '../export'
const ReviewPage = ({reviews}) => {
  return (
    <div className="w-4/5 m-auto max-lg:w-11/12 flex flex-col gap-8 mt-20">
    <h1 className="text-3xl text-gray-700 text-center">Ratings & Reviews</h1>
        {
          reviews.map((item , index) => (
                <Review key={index} item={item}/>
          ))
        }
    </div>
  )
}

export default ReviewPage