
import { createContext, useContext, useReducer } from "react";

const HotelContext = createContext();

function hotelReducer(state, action) {
  switch (action.type) {
    case "SET_HOTEL_NAME":
      return { ...state, hotelName: action.payload };

    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
}

export function HotelProvider({ children }) {
  const [state, dispatch] = useReducer(hotelReducer, {
    hotelName: "Grand Horizon Hotel",
    darkMode: false,
  });

  return (
    <HotelContext.Provider value={{ state, dispatch }}>
      <div className={state.darkMode ? "dark-theme" : ""}>
        {children}
      </div>
    </HotelContext.Provider>
  );
}

export function useHotel() {
  return useContext(HotelContext);
}
