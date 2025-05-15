import React, { useCallback, useEffect, useState } from 'react';
import dataBaseServices from '../../Appwrite/Database';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import UserCard from '../../components/UserCard';
import { ChatBox, UserSkeleton } from '../../export';

const AllEmployee = () => {
  const [alluser, setAllUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dataBaseServices.getAllUser()
      .then((res) => {
        if (res) setAllUser(res.documents);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, []);

  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    try {
      const res = await dataBaseServices.deleteUserFromDatabase(userId);
      if (res) {
        toast.success("User Deleted Successfully");
        setAllUser(prev => prev.filter(item => item.userId !== userId));
        navigate("/user");
      }
    } catch (error) {
      toast.error(error.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (!alluser) return <UserSkeleton />;

  return (
    <div className="w-full px-6 py-10 min-h-screen bg-[#111111] text-white">
    
      <div className="flex flex-col gap-5">
        {alluser.length === 0 ? (
          <p className="text-gray-400">No employees found.</p>
        ) : (
          alluser.map((user) => (
            <UserCard
              key={user.$id}
              deleteUser={deleteUser}
              loading={loading}
              details={user}
            />
          ))
        )}
      </div>
      <ChatBox />
    </div>
  );
};

export default AllEmployee;
