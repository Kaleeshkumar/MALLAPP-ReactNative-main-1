import React,{createContext, useState, useContext } from "react";

const UserContext =createContext();

export const UserProvider = ({children})=>{
    const [userData,setUserData] =useState({
        name:"name",
        role:'role',
        email:'user.email',
        number:'user.number',
        place_of_work:'mallLocation',
        Dob:'date',
        joiningDate: '01/01/2022',
        workingDays: 20,
        
        salary: '$5,000',
        incentive: '$500',
        target: '$15,000',
    });

    return(
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    );

};
export const useUser = () => {
    return useContext(UserContext);
  };