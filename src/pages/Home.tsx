import React from 'react';
import { useGetDogFact } from '../hooks/useGetDogFact';

const Home: React.FC = () => {
  const { data, isLoading, error } = useGetDogFact();

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome to the home page!</h2>
      <div style={{ marginTop: 20 }}>
        <h3>Random Dog Image</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading dog image.</p>}
        {!isLoading && !error && <img src={data} alt="Random Dog" />}
      </div>
    </div>
  );
};

export default Home;
