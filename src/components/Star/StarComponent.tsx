import React from 'react';
import './StarComponent.scss';
import { FaStar } from 'react-icons/fa';

interface StarComponentProps {
  rating: string;
}

const StarComponent: React.FC<StarComponentProps> = ({ rating }) => {
  return (
    <div className="star-component">
      <FaStar className="star-icon" />
      <span className="star-rating">{rating}</span>
    </div>
  );
};

export default StarComponent;
