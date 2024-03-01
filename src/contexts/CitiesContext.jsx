import { createContext, useEffect, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const CitiesContext = createContext();

function flagemojiToPNG(flag) {
  var countryCode = Array.from(flag, (codeUnit) =>
    String.fromCharCode(codeUnit.codePointAt() - 127397).toLowerCase()
  ).join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    if (storedCities.length)
      dispatch({ type: "cities/loaded", payload: storedCities });
    else {
      localStorage.setItem("cities", JSON.stringify([]));
      dispatch({ type: "cities/loaded", payload: [] });
    }
  }, []);

  const getCity = (id) => {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const city = storedCities.find((city) => city.id === id.toString());
    dispatch({ type: "city/loaded", payload: city });
  };

  const createCity = (newCity) => {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const id = uuidv4();
    const cityWithId = { ...newCity, id };
    const updatedCities = [...storedCities, cityWithId];
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    dispatch({ type: "city/created", payload: cityWithId });
  };

  const deleteCity = (id) => {
    const storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    const updatedCities = storedCities.filter((city) => city.id !== id);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    dispatch({ type: "city/deleted", payload: id });
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities, flagemojiToPNG };
