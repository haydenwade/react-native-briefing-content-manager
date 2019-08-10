import a from 'axios';
import config from './config';

// const a = axios.create({
//     baseURL: config.usgsPublicApi,
//     headers: {
//         'content-type': 'application/json'
//     }
// });

const USGSRepository = {
    getEarthquakes: async () => {
        let result = [];
        try {
            const resp = await a.get(config.usgsPublicApi);
            for (let i = 0; i < 50; i++) {
                const item = { ...resp.data.features[i], key: resp.data.features[i].id };
                result.push(item);
            }
        } catch (err) {
            console.log('list err:', err);
        }
        return result;
    },
    getEarthquake: async (urlToDetails) => {
        let result = {};
        try {
            let resp = await a.get(urlToDetails);
            // console.log(resp.data);
            result = {
                place: resp.data.properties.place,
                magnitude: resp.data.properties.mag,
                time: resp.data.properties.time,
                nearbyCities: []
            };
            if (resp.data && resp.data.properties && resp.data.properties.products && resp.data.properties.products['nearby-cities']) {
                for (let i = 0; i < resp.data.properties.products['nearby-cities'].length; i++) {
                    let nearbyCitiesResp = await a.get(resp.data.properties.products['nearby-cities'][i].contents['nearby-cities.json'].url);
                    result.nearbyCities = nearbyCitiesResp.data;//may want to take top 10
                }
            }
            //TODO: theres a better way to do this
            for(let i = 0; i < result.nearbyCities.length;i++){
                result.nearbyCities[i].key = i + 'nearbyCityKey';
            }

        } catch (err) {
            console.log('details err:', err);
        }
        return result;
    }
};
module.exports = USGSRepository;