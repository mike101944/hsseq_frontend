
import React,{useState} from "react";
import { registerUser } from "../../../redux/action/hhhhhhh"
import { useDispatch,useSelector } from "react-redux";


export const AddUserModal =({setModalOpen})=>{

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  // Form state
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    setModalOpen(false);
  };
    
    const [selectedOption, setSelectedOption] = useState("");

    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    return(


        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ease-in-out" 
            onClick={()=>setModalOpen(false)} >
              <div className="flex flex-row justify-between bg-white rounded-lg shadow-md  max-w-[840px]  relative overflow-auto opacity-100" 
                        onClick={(e)=>e.stopPropagation()}>
                      {/* <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button> */}
                      <form
                      onSubmit={handleSubmit}
                action=""
                className="flex flex-wrap gap-4 justify-center items-center bg-white px-6 py-5 rounded-lg w-full  relative"
              >
                <span className="flex justify-center rounded-lg text-blue-500 font-serif font-semibold  bg-white items-center px-4 py-2 w-full">
                  Add New User
                </span>


                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="First Name"
                    className="text-gray-600 font-medium mr-2"
                  >
                    First Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    placeholder="enter first name  "
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

               

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="Last Name"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Last Name :{" "}
                  </label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder="enter last name  "
                        className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                        />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="email"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Email :{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="enter user email"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="password"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Password:{" "}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="enter user password"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="phone"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Phone number:{" "}
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

            





                <button
                  
                type="submit"
                  className="flex justify-center rounded-lg text-white font-serif font-semibold  bg-blue-600 items-center px-4 py-2 w-full"
                >
                  Save
                </button>


                </form>
              </div>
            </div>
    )
}