// Profile Component using Tailwind CSS
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import MapComponents from '../components/MapComponents';

const Profile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // display the sepacific user 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const res = await response.json()
        if(res){
            setUser(res)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  
  
    
    if(loading){
        return <Loader/>
    }
  return (
    <>
    {
        user ? 
    <div className="w-full  p-6 bg-white shadow-md max-sm:p-2">
      <div className="flex gap-5 max-md:flex-col max-md:items-center ">
        <img 
          src={user.image} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-32 h-32 rounded-full border-4 border-blue-500" 
        />
        <div className="max-md:text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600">{user.role}</p>
          <p className="mt-2 text-gray-500">{user.email}</p>
          <p className="mt-2 text-gray-500">Phone: {user.phone}</p>
        </div>
      </div>

<div>
    
</div>
      <div className="mt-6 grid grid-cols-3 max-md:grid-cols-2">
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Personal Details</h2>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Birth Date:</strong> {user.birthDate}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Address</h2>
          <p><strong>Street:</strong> {user.address.address}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>State:</strong> {user.address.state}</p>
          <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
          <p><strong>Country:</strong> {user.address.country}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Company Details</h2>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Department:</strong> {user.company.department}</p>
          <p><strong>Title:</strong> {user.company.title}</p>
          <p><strong>Company Address:</strong> {user.company.address.address}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Bank Information</h2>
          <p><strong>Card Number:</strong> {user.bank.cardNumber}</p>
          <p><strong>Card Expire:</strong> {user.bank.cardExpire}</p>
          <p><strong>Card Type:</strong> {user.bank.cardType}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700">Crypto Information</h2>
          <p><strong>Coin:</strong> {user.crypto.coin}</p>
          <p><strong>Wallet:</strong> {user.crypto.wallet}</p>
          <p><strong>Network:</strong> {user.crypto.network}</p>
        </div>
      </div>
      <div className='mt-10'>
        {/* {// display the map by the user coordinates using leaflet because google map or mapbox take creadit card for trail} */}
     <MapComponents coordinates={user.company.address.coordinates}/>
      </div>
    </div> : <div className="flex justify-center items-center h-screen">User not found</div>
   
    }
    
    </>
  );
};

export default Profile;