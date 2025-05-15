import React from 'react';
import './AddItem.scss';

interface AddItemButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({
  onClick,
  label = 'Adicionar itens à loja',
  className = '',
  disabled = false
}) => {
  return (
    <button 
      className={`add-item-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className="add-icon">+</span>
      <span className="add-label">{label}</span>
    </button>
  );
};

export default AddItemButton;