import React from 'react'

const AppName = () => {
  console.log('app anme');
  
  return (
    <div className='w-5/6 h-26 m-auto mt-16'>
      <p className='text-4xl font-semibold capitalize text-center '>for better experiance downlaod </p>
      <p className='capitalize text-4xl font-semibold text-center'>tomato app</p>
      <div className=' flex justify-center items-center gap-10 mt-5 '>
        <img className='w-40 h-20 ' src="https://cdn.pixabay.com/photo/2021/09/22/16/07/google-play-6647242_1280.png" alt="img" />
        <img className='w-40 h-14 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStmAcRaYAd4ODTHasoTnOSfUxA1Xa2IJy14g&s" alt="img" />
      </div>
    </div>
  )
}

export default AppName