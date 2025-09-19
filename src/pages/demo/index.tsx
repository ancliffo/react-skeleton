import React from "react";
import { Button, Typography } from "@mui/material";
import { useGetDogPic } from "../../hooks/useGetDogPic";

/** Demo page that utilizes an API */
const Home: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetDogPic();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h1" fontSize={24}>
        Dog Page
      </Typography>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "start",
        }}
      >
        <Typography variant="h3" fontSize={18}>
          Random Dog Image
        </Typography>

        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography>Error loading dog image.</Typography>}
        {!isLoading && !error && <img style={{ maxWidth: 500 }} src={data} alt="Random Dog" />}
        <Button variant="contained" color="secondary" onClick={() => refetch()}>
          Get New Dog
        </Button>
      </div>
    </div>
  );
};

export default Home;
