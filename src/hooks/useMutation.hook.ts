import { useCallback, useState } from "react";

interface UseMutationProps<T = unknown, P = unknown> {
  fetchFn: (params?: P) => Promise<T>;
}

const handleFetch = async <T = unknown, P = unknown>(
  fetchFn: (params?: P) => Promise<T>,
  loadingSetter: (value: boolean) => void,
  dataSetter: (value: T | undefined) => void,
  errorSetter: (error: Error | undefined) => void,
  params?: P
) => {
  loadingSetter(true);
  try {
    const response = await fetchFn(params);
    dataSetter(response);
    errorSetter(undefined);
    loadingSetter(false);
    return response;
  } catch (e) {
    dataSetter(undefined);
    loadingSetter(false);
    errorSetter(e as Error);
    return undefined;
  }
};

export const useMutation = <T = unknown, P = unknown>(
  props: UseMutationProps<T, P>
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const mutate = useCallback(
    (params: P) => {
      return handleFetch(props.fetchFn, setLoading, setData, setError, params);
    },
    [props]
  );

  return {
    mutate,
    loading,
    data,
    error,
  };
};
