import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clear from "../src/assets/clear.png";
import Humidity from "../src/assets/humidity.png";
import wind from "../src/assets/wind.png";
import { apiRequist } from "./api";
import { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [data, setData] = useState(null);

    const handleSearch = async () => {
        try {
            const result = await apiRequist(city);
            setData(result);
        } catch (error) {
            console.log("Error fetching data From Api :", error);
        }
    };

    return (
        <div className="bg-emerald-950 min-h-screen flex items-center justify-center px-4">
            <div className="bg-emerald-800/40 text-white border border-emerald-500/70 min-h-[600px] min-w-full md:min-w-3xl lg:max-w-4xl rounded-2xl p-5 md:py-5 md:px-10">
                {/* flex */}
                <div className="flex flex-col items-center gap-10">
                    {/* search form */}
                    <div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                            className="bg-green-800/90 border border-green-500 p-2 md:p-4 rounded-2xl space-x-4 flex"
                        >
                            <input
                                type="text"
                                placeholder="Enter the city name ..."
                                className="text-xl md:text-2xl focus:outline-none"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button className="text-xl md:text-2xl cursor-pointer duration-300 hover:text-emerald-500">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </form>
                    </div>

                    {/* Weather icon */}
                    <div>
                        <img
                            src={
                                data
                                    ? `https:${data.current.condition.icon.replace(
                                          "64x64",
                                          "128x128"
                                      )}`
                                    : clear
                            }
                            alt={data ? data.current.condition.text : "clear"}
                        />
                    </div>

                    {/* Temperature and city name */}
                    <div className="text-3xl md:text-4xl lg:text-5xl font-semibold space-y-4 text-center">
                        <p>{data ? data.location.name : "City"}</p>
                        <h1>{data ? data.current.temp_c : "20"}°C</h1>
                    </div>

                    {/* Humidity and wind speed */}
                    <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-between text-center">
                        {/* Humidity */}
                        <div className="flex items-center gap-4 justify-between w-full md:w-fit">
                            <img src={Humidity} alt="Humidity" />
                            <div className="text-xl md:text-2xl">
                                <p>{data ? data.current.humidity : "30"} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>

                        {/* wind speed */}
                        <div className="flex items-center gap-4 justify-between w-full md:w-fit">
                            <img src={wind} alt="wind speed" />
                            <div className="text-xl md:text-2xl">
                                <p>
                                    {data ? data.current.wind_kph : "20"} km/h
                                </p>
                                <p>wind speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
