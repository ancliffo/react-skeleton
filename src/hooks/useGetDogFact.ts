import { useQuery } from '@tanstack/react-query';

export interface DogFact {
  id: string;
  type: string;
  attributes: {
    body: string;
  };
}

export function useGetDogFact() {
  return useQuery({
    queryKey: ['dogFact'],
    queryFn: async () => {
      const res = await fetch('https://dogapi.dog/api/v2/facts?limit=1');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.data as DogFact[];
    },
  });
}
