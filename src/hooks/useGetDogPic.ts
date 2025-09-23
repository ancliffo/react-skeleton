import { useQuery } from "@tanstack/react-query";

export interface DogPic {
  id: string;
  url: string;
}

export function useGetDogPic(count: number = 0) {
  return useQuery({
    queryKey: ["dogPic", count],
    queryFn: async () => {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return data.message as string;
    },
  });
}
