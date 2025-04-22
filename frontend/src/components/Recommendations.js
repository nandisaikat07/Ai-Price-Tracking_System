import React from 'react';

function Recommendations() {
    // This would be fetched from the backend
    const recommendations = []; // Replace with actual data

    return (
        <div>
            <h2>Recommended Products</h2>
            <ul>
                {recommendations.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default Recommendations;