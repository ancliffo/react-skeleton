import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import ListItem from './ListItem';
import { IconPlus } from '@tabler/icons-react';
import { IconMinus } from '@tabler/icons-react';
import { useGetDogPic } from '../../hooks/useGetDogPic';

const Demo: React.FC = () => {
  const title = 'Counter Page';
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, error } = useGetDogPic(count);

  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  const handleButtonClick = (type: string) => {
    if (type === 'increment') {
      setCount(count + 1);
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };

  // This function is memoized in MemoizedListItem component
  const handleItemClick = useCallback((id: number) => {
    alert(`Clicked on item with id: ${id}`);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <h2>Current Count: {count}</h2>
        <Button
          handleClick={handleButtonClick}
          title="Increment"
          icon={<IconPlus style={{ marginRight: '4px' }} />}
        />
        <Button
          handleClick={handleButtonClick}
          title="Decrement"
          icon={<IconMinus style={{ marginRight: '4px' }} />}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading dog image.</p>}
        {!isLoading && !error && <img style={{ maxWidth: 500 }} src={data} alt="Random Dog" />}
        <hr />
        <div style={{ maxWidth: '500px' }}>
          <h3>Items:</h3>
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <input
              type="text"
              value={inputValue}
              placeholder="Add Item"
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                if (inputValue) {
                  setItems([...items, { id: items.length + 1, name: inputValue }]);
                  setInputValue('');
                  console.log('Item Added');
                }
              }}
            >
              Add
            </button>
          </div>
          <ul>
            {items.map((item) => (
              <ListItem key={item.id} item={item} handleItemClick={handleItemClick} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Demo;
