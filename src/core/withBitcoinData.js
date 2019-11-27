import { useState, useEffect } from "react";

const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";

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
      const strStartDate = getISODate(start);
      const strEndDate = getISODate(end);

      url = `${apiUrl}?start=${strStartDate}&end=${strEndDate}`;
    }

    setLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const bitcoinData = formatBitcoinData(data);
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

const getISODate = jsDate => {
  return jsDate.toISOString().split("T")[0];
};

const formatBitcoinData = ({ bpi }) => {
  return Object.entries(bpi).map(([date, value]) => ({
    date: new Date(date),
    value
  }));
};
