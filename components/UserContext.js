import React,{createContext, useState, useContext } from "react";

const UserContext =createContext();

export const UserProvider = ({children})=>{
    const [userData,setUserData] =useState({
        name:"name ",
        role:'userData.role',
        email:'user.email',
        number:'user.number',
        place_of_work:'vr mall',
        Dob:'date'
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