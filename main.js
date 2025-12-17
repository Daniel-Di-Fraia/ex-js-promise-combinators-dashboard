async function getDashboardData(query) {
    const baseUrl = "http://localhost:3333";
    try {
        const [datiDestinazione, datiMeteo, datiAirport] = await Promise.all([
            fetch(`${baseUrl}/destinations?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/weathers?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/airports?search=${query}`).then(res => res.json())
        ]);

        const dati = {
            destinazione: datiDestinazione,
            meteo: datiMeteo,
            airport: datiAirport
        };

        return dati;

    } catch (error) {
        console.error("errore nel recupero dei dati", error);
        throw new Error("errore");
    }
}

getDashboardData('london')
    .then(result => {
        console.log(result);

        const destinazione = result.destinazione[0];
        const meteo = result.meteo[0];
        const airport = result.airport[0];

        console.log(
            `${destinazione.name} is in ${destinazione.country}.\n` +
            `Today there are ${meteo.temperature} degrees and the weather is ${meteo.weather_description}.\n` +
            `The main airport is ${airport.name}.\n`
        )
    })
    .catch(error => console.error(error));
