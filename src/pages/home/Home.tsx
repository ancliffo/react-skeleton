import React from 'react';
import { useGetDogPic } from '../../hooks/useGetDogPic';

const Home: React.FC = () => {
  const { data, isLoading, error } = useGetDogPic();

  return (
    <div>
      <h1>Dog Page</h1>
      <h2>Welcome to the home page!</h2>
      <div style={{ marginTop: 20 }}>
        <h3>Random Dog Image</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading dog image.</p>}
        {!isLoading && !error && <img style={{ maxWidth: 500 }} src={data} alt="Random Dog" />}
      </div>
    </div>
  );
};

export default Home;
