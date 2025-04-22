import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="card scale-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        borderRadius: '1rem',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="relative" style={{ paddingTop: '75%' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Quick action buttons */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(1rem)',
            transition: 'all 0.3s ease'
          }}
        >
          <button
            className="btn glass"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            <FaEye />
          </button>
          <button
            className="btn glass"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="p-4">
        <Link 
          to={`/product/${product.slug}`}
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <h3 
            style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: 'var(--text-primary)'
            }}
          >
            {product.name}
          </h3>
        </Link>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--accent-color)'
            }}
          >
            <FaStar />
            <span style={{ marginLeft: '0.25rem' }}>{product.rating}</span>
          </div>
          <span style={{ color: 'var(--text-secondary)' }}>
            ({product.numReviews} reviews)
          </span>
        </div>

        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem'
          }}
        >
          <div>
            <span 
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--primary-color)'
              }}
            >
              ${product.price}
            </span>
            {product.oldPrice && (
              <span 
                style={{
                  marginLeft: '0.5rem',
                  textDecoration: 'line-through',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}
              >
                ${product.oldPrice}
              </span>
            )}
          </div>
          
          <button
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
} 