import React, { createContext, useState } from "react";

export const CityContext = React.createContext()



// export const CityContext = createContext()

// export const CityProvider = (props) => {

//     // const [currentCity,setCurrentCity] = useState([{id:0,idsArray:[],idsStr:""}]);

//     const [currentCity,setCurrentCity] = useState({
//         idsStr:"",
//         idsArray:[],
//         citiesList : [{title:"",parent:-1,slug:""}]
//     });
    
//     return(
//         <CityContext.Provider
//             value={[currentCity,setCurrentCity]}
//         >
//             {props.children}
//         </CityContext.Provider>
//     )
// }
