import axios from 'axios';


const request = (url) => {
    return axios
    .get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(({data}) => data);
};

const getSymbols = () => request('https://one-line-ai.github.io/tradingview-test-demo/symbols/list.json');
const getSeries = async (symbol) => {
    const { historical } = await request(`https://one-line-ai.github.io/tradingview-test-demo/series/${symbol}.json`);
    return historical.map(({ date, adjClose }) => ({ time: date, value: adjClose })).reverse();
}


export default request;
export { getSymbols, getSeries };