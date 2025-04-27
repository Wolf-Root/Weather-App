export async function apiRequist(city) {
    const ApiKey = import.meta.env.VITE_API_KEY;
    const ApiCall = `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(ApiCall);
        if (!response.ok) {
            throw new Error("Error fetching data");
        }
        const data = await response.json();

        if (data.error) {
            alert("City not found. Please enter a valid city name.");
            throw new Error(data.error.message);
        }

        return data;
    } catch (error) {
        alert("City not found. Please enter a valid city name.");
        throw error;
    }
}
