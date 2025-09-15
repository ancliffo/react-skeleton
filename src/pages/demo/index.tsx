import React, { useState, useEffect } from "react";
import Button from "./Button";
import { IconPlus } from "@tabler/icons-react";
import { IconMinus } from "@tabler/icons-react";
import { useGetDogPic } from "../../hooks/useGetDogPic";

const Demo: React.FC = () => {
  const title = "Counter Page";
  const [count, setCount] = useState(0);
  const { data, isLoading, error } = useGetDogPic(count);

  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  const handleButtonClick = (type: string) => {
    if (type === "increment") {
      setCount(count + 1);
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <h2>Current Count: {count}</h2>
        <Button
          handleClick={handleButtonClick}
          title="Increment"
          icon={<IconPlus style={{ marginRight: "4px" }} />}
        />
        <Button
          handleClick={handleButtonClick}
          title="Decrement"
          icon={<IconMinus style={{ marginRight: "4px" }} />}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading dog image.</p>}
        {!isLoading && !error && <img style={{ maxWidth: 500 }} src={data} alt="Random Dog" />}
        <hr />
        <div>
          <div>
            <h3>Items:</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
