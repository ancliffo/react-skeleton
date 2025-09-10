import React from "react";

const Button: React.FC<{ 
    title: string, 
    icon: React.ReactNode, 
    handleClick: (type: 'increment' | 'decrement') => void 
}> = ({title, icon, handleClick}) => {
    
    return (
        <button onClick={() => handleClick(title.toLowerCase() === 'increment' ? 'increment' : 'decrement')}
        className="increment-button" style={{ color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
            {icon}
            <span>{title}</span>
        </button>
    );
};  

export default Button;
              