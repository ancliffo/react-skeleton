import { useQuery } from '@tanstack/react-query';

export interface DogFact {
  id: string;
  type: string;
  attributes: {
    body: string;
  };
}

export function useGetDogFact(count: number = 0) {
  return useQuery({ 
    queryKey: ['dogFact', count],
    queryFn: async () => {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.message as string;
    },
  });
}
