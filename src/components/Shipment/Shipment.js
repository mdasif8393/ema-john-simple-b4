import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from "../../App";


const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log("form submit",data);


  console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
     
      <input  name="name" defaultValue={loggedInUser.name} placeholder="Your name" {...register("exampleRequired",  { required: true })} />
      {errors.name && <span className="error">Name required</span>}

      <input d name="email" defaultValue={loggedInUser.email} placeholder="Your email" {...register("exampleRequired", { required: true })} />
      {errors.name && <span className="error">Email required</span>}

      <input name="address" placeholder="Your address" {...register("exampleRequired", { required: true })} />
      {errors.name && <span className="error">Address required</span>}

      <input name="phone" placeholder="Your contact number" {...register("exampleRequired", { required: true })} />
      {errors.name && <span className="error">Phone number required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;