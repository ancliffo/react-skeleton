import React from 'react';
import { useGetDogFact } from '../hooks/useGetDogFact';

const Home: React.FC = () => {
  const { data, isLoading, error } = useGetDogFact();

  let factBody = '';
  if (data && data.length > 0) {
    factBody = data[0].attributes.body;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <div style={{ marginTop: 20 }}>
        <h2>Dog Fact</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading dog fact.</p>}
        {!isLoading && !error && <p>{factBody}</p>}
      </div>
    </div>
  );
};

export default Home;
