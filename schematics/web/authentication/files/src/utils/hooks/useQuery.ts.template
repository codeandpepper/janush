import { useLocation } from "react-router-dom";

export const useQuery = (): URLSearchParams => {
  const { search } = useLocation();

  return new URLSearchParams(search);
};
