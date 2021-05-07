import { useState, useEffect } from "react";
import googleTrends from "google-trends-api";

export const restoreTrends = (): Object | null => {
  let trends: Object = null;

  try {
    const storedData: string | null = window.localStorage.getItem("trends");

    if (storedData) {
      trends = JSON.parse(storedData);
    } else {
      trends = null;
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return trends;
};

export const storeTrends = (trends: Object): void => {
  window.localStorage.setItem("trends", JSON.stringify(trends));
};

const useSocial = () => {
  const [keyword, setKeyword] = useState<string>("solana");
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    addTrend("solana");
  }, []);

  useEffect(() => {
    if (!trends || !(keyword in trends)) {
      console.log("getting trend for ", keyword);
      addTrend(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    storeTrends(trends);
  }, [trends]);

  const addTrend = (keyword: string) => {
    console.log("fetching trend for ", keyword);
    googleTrends
      .interestOverTime({ keyword })
      .then(function (results) {
        setTrends({
          ...trends,
          keyword: results,
        });
        console.log(results);
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  return { keyword, setKeyword };
};

export default useSocial;
