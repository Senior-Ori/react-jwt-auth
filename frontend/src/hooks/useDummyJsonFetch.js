import { useState, useEffect } from "react";

const useDummyJsonFetch = (prop) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(prop.url);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (prop.url) {
      fetchData();
    }

    return () => {
      // Cleanup if needed when component unmounts or URL changes
    };
  }, [prop.url]); // Dependency array includes url to refetch if it changes

  return { data, isLoading, error };
};

export default useDummyJsonFetch;
