import React from 'react';
import { Link } from 'react-router-dom';
import './PopCategory.css'; // Create a separate CSS file for styling

const PopCategory = ({ category }) => {
  return (
    <div className="card pop-category-card">
      <div className="card-body">
        <h5 className="card-title">{category.name}</h5>
        <Link to={`/category/${category.name}`} className="btn btn-outline-dark w-100">Explore</Link>
      </div>
    </div>
  );
}

export default PopCategory;
