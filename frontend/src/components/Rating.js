import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating, numReviews }) {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((num) => (
          <span key={num}>
            {rating >= num ? (
              <FaStar />
            ) : rating >= num - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>
      {numReviews > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({numReviews} {numReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}

export default Rating;
