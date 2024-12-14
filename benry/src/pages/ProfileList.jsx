import ProfileCard from "../components/ProfileCard";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { FilterProfile } from "../../exports";
import { useEffect, useState } from "react";
import { setAllProfile } from "../store/profileList";

const ProfileList = () => {
  const { allProfile, allOption } = useSelector((state) => state.profileList);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState("select a location");
  const [role, setRole] = useState("select a role");

  // fetch the data according to filter category
  useEffect(() => {
    const fetchFilterProfile = async () => {
      setLoader(true);
      try {
        // make if else because this api have only one queary at a time
        if (location == "select a location" && role == "select a role") {
          dispatch(setAllProfile(allOption));
        } else if (
          location !== "select a location" &&
          role == "select a role"
        ) {
          const response = await fetch(
            `https://dummyjson.com/users/filter?key=address.state&value=${location}`
          );
          const res = await response.json();
          if (res) {
            dispatch(setAllProfile(res.users));
          }
        } else if (
          location == "select a location" &&
          role !== "select a role"
        ) {
          const response = await fetch(
            `https://dummyjson.com/users/filter?key=company.title&value=${role}`
          );
          const res = await response.json();
          if (res) {
            dispatch(setAllProfile(res.users));
          }
        } else if (
          location !== "select a location" &&
          role !== " select a role"
        ) {
          console.log("working");

          const response = await fetch(
            `https://dummyjson.com/users/filter?key=address.state&value=${location}`
          );
          const res = await response.json();
          if (res) {
            const filterData = res.users.filter(
              (item) => item.company.title === role
            );
            dispatch(setAllProfile(filterData));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchFilterProfile();
  }, [location, role]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div className="flex gap-4 mt-5 px-14 ">
            <FilterProfile
              option={allOption}
              value={location}
              setOptionValue={setLocation}
              label={"filter by location"}
            />
            <FilterProfile
              option={allOption}
              value={role}
              setOptionValue={setRole}
              label={"filter by role"}
            />
          </div>
          <div className="w-full  px-16 grid grid-cols-2  gap-5  max-lg:px-10 max-md:grid-cols-1 max-md:px-5 max-md:gap-8 mt-10 max-w-[1400px] relative">
            
      {/* {dispaly profile cards} */}
            {allProfile && allProfile.length > 0 ? (
              allProfile.map((item) => (
                <ProfileCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-xl absolute top-10 left-[45%] text-black">
                User not found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileList;
