async function getDashboardData(query) {
    const baseUrl = "http://localhost:3333";
    try {
        const [datiDestinazione, datiMeteo, datiAirport] = await Promise.all([
            fetch(`${baseUrl}/destinations?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/weathers?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/airports?search=${query}`).then(res => res.json())
        ]);

        const dati = {
            city: datiDestinazione[0].name,
            country: datiDestinazione[0].country,
            temperature: datiMeteo[0].temperature,
            weather: datiMeteo[0].weather_description,
            airport: datiAirport[0].name
        };

        return dati;

    } catch (error) {
        throw new Error("errore nel recupero dei dati", error.message);
    }
}

getDashboardData('london')
    .then(result => {
        console.log(result);

        console.log(
            `${result.city} is in ${result.country}.\n` +
            `Today there are ${result.temperature} degrees and the weather is ${result.weather}.\n` +
            `The main airport is ${result.airport}.\n`
        )
    })
    .catch(error => console.error(error));
