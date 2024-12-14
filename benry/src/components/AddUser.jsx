import React, { useId } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAllProfile } from "../store/profileList";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
    const {allProfile}  = useSelector(state => state.profileList)
    const dispatch = useDispatch()
    const id = useId()  // generate unique id 

    const navigate = useNavigate()
    // use react hook form liabrary for handle form 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    // add the user when the form is submitted
    const onSubmit = (data) => {
        let newUser = {
            id : id ,
            firstName : data.firstName,
            email : data.email,
            birthDate : data.birthDate,
            company : {title : data.role},
            address : {
                state : data.state,
                address : data.address,
                country : data.country
            },
            image : data.image,
            phone : data.phone ,
            userAgent : data.description
            
        }
    
        try {
            fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
              })
              .then(res => res.json())
              .then((res) => {
                if(res){
                    const newProfile = [res , ...allProfile ]
                    dispatch(setAllProfile(newProfile))
                 alert('user added successfully')
                 navigate("/admin")
                }
              });
        } catch (error) {
            console.log(error);
            
        }
    
           
    };
    return (
        <main className="max-w-7xl mx-auto p-6">
            <section className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Add New User</h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* {  // make input components } */}
                    <Input
                        label="Username"
                        type="text"
                        {...register("firstName", { required: true })}
                    />
                    <Input label="Email" type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                     />
                    <Input label="Phone" type="tel" {...register("phone", { required: true })} /> 
                    <Input label="Role" type="tel" {...register("role", { required: true })} />
                    <Input label="Country" type="text" {...register("country", { required: true })} />
                    <Input label="State" type="text" {...register("state", { required: true })} />
                    <Input label="Birthdate" type="date" {...register("birthDate", { required: true })} />
                    <Input label="Address" type="text" {...register("address", { required: true })} />
                    <Input label="Description" type="text" {...register("description", { required: true })} />
                    <Input label="URL" type="text" {...register("image", { required: true })} />

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default AddUser;
