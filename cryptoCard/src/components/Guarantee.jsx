import React from 'react'

const Guarantee = () => {
  return (
    <div className=" text-white w-full max-w-md mt-16   ">
    {/* Image section */}
    <div className="px-5">
    <img
      src="/man.jpg" // Replace with actual image URL or import
      alt="Man holding Bepjet card"
      className="w-full h-96 object-cover rounded-md "
    />
    </div>
    

    {/* Text Section */}
    <div className="p-6">
      <h2 className="text-4xl font-semibold bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent ">Guaranteed</h2>
      <h3 className="text-white text-2xl font-bold mb-4">for 25+ years</h3>
      <p className="text-sm text-[#6c6c70] font-medium mb-6">
        <span className="text-[#fff]"> Your Bepjet hardware wallet can last for at least 25 years with proper care.</span>
        Its monolithic design ensures the chip remains functional, even in extreme conditions.
      </p>
      
      {/* Button */}
      <button className="bg-[linear-gradient(to_right,_#66ccffb3,_#09f)] text-white text-lg px-5 py-2 font-semibold rounded-lg">
  Get Bepjet
</button>
    </div>
  </div>
  )
}

export default Guarantee