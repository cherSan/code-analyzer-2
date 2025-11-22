import React from 'react';

interface buttonProps {
    readonly children: React.ReactNode;
    readonly onClick?: () => void;
    readonly variant?: 'primary' | 'secondary';
}

const unusedVariable = 'This should trigger lint warning';

export const Button: React.FC<buttonProps> = ({ children, onClick, variant = 'primary' }) => (
    <button className={`btn btn-${variant}`} onClick={onClick} style={{ padding: '10px' }}>
        {children}
    </button>
);
function UnusedComponent() {
    return <div>Never used</div>;
}
