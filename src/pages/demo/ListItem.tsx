import React from 'react';

const ListItem: React.FC<{
  item: { id: number; name: string };
  handleItemClick: (id: number) => void;
}> = React.memo(({ item, handleItemClick }) => {
  console.log('Rendering item:', item);
  return (
    <li>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>{item.id}</span>
        <span>{item.name}</span>
        <button>Delete</button>
        <button onClick={() => handleItemClick(item.id)}>Alert</button>
      </div>
    </li>
  );
});

export default ListItem;
