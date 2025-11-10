import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

//T represents the type of data returned by the fn (API call)
//P represents the type of parameters passed to the fn. Must be an object (Record) and the keys must be a string and the values must be either strings OR numbers

interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppwriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams: P) => Promise<void>;
}

// custom react hook for managing Appwrite API calls with state and error handling
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn, //The asynchronous function to fetch data
  params = {} as P,
  skip = false,
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  //using useCallback hook prevents creating a new function on every render (the function reference stays the same unless fn changes)
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  //Automatically fetch data on component mount, unless 'skip' is enabled
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  // Refetch function to fetch data with new params
  const refetch = async (newParams: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};
