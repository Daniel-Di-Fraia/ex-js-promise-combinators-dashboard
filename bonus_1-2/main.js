async function getDashboardData(query) {
    const baseUrl = "http://localhost:3333";
    try {
        const results = await Promise.allSettled([
            fetch(`${baseUrl}/destinations?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/weathers?search=${query}`).then(res => res.json()),
            fetch(`${baseUrl}/airports?search=${query}`).then(res => res.json())
        ]);

        const datiDestinazione = results[0];
        const datiMeteo = results[1];
        const datiAirport = results[2];

        const dati = {
            city: null,
            country: null,
            temperature: null,
            weather: null,
            airport: null
        };

        //Controllo il risultato di destinations
        if(datiDestinazione.status === 'rejected'){
            console.error('Problema in destinations: ', datiDestinazione.reason);
            dati.city = null;
            dati.country = null;
        }else{
            const destination = datiDestinazione.value[0];
            dati.city = destination ? destination.name : null;
            dati.country = destination ? destination.country : null;
        }

        //Controllo il risultato di weathers
        if(datiMeteo.status === 'rejected'){
            console.error('Problema in weathers: ', datiMeteo.reason);
            dati.temperature = null;
            dati.weather = null;
        }else{
            const weather = datiMeteo.value[0];
            dati.temperature = weather ? weather.temperature : null;
            dati.weather = weather ? weather.weather_description : null;
        }

        //Controllo il risultato di airports
        if(datiAirport.status === 'rejected'){
            console.error('Problema in airports: ', datiAirport.reason);
            dati.airport = null;
        }else{
            const airport = datiAirport.value[0];
            dati.airport = airport ? airport.name : null;
        }

        return dati;

    } catch (error) {
        throw new Error("errore nel recupero dei dati: " + error.message);
    }
}

getDashboardData('vienna')
    .then(result => {
        console.log(result);

        let output = '';

        if (result.city && result.country) {
            output += `${result.city} is in ${result.country}.\n`;
        }

        if (result.temperature && result.weather) {
            output += `Today there are ${result.temperature} degrees and the weather is ${result.weather}.\n`;
        }

        if (result.airport) {
            output += `The main airport is ${result.airport}.\n`;
        }

        if (output) {
            console.log(output);
        }
    })
    .catch(error => console.error(error));
