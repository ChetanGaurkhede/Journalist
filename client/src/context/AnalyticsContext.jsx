import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(import.meta.env.VITE_API_URL);
      setAnalytics(res.data.data);
    } catch (err) {
      setError(`Failed to fetch trading data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <AnalyticsContext.Provider
      value={{ analytics, loading, error, refetch: fetchAnalytics }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
