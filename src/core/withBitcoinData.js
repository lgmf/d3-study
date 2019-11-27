import { useState, useEffect } from "react";

const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

const _getISODate = jsDate => {
  return jsDate.toISOString().split("T")[0];
};

const _getBitcoinData = ({ bpi }) => {
  return Object.entries(bpi).map(([date, value]) => ({
    date: new Date(date),
    value
  }));
};

/**
 * start = JS date
 * end = JS date
 */
export default function(start, end) {
  const [loading, setLoading] = useState(true);
  const [bitcoinData, setBitcoinData] = useState([]);

  useEffect(() => {
    let url = apiUrl;

    if (!!start && !!end) {
      const strStartDate = _getISODate(start);
      const strEndDate = _getISODate(end);
      debugger;
      url = `${apiUrl}?start=${strStartDate}&end=${strEndDate}`;
    }

    setLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const bitcoinData = _getBitcoinData(data);
        setBitcoinData(bitcoinData);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [start, end]);

  return [loading, bitcoinData];
}
