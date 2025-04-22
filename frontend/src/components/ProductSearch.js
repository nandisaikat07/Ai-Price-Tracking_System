import React, { useState } from 'react';

function ProductSearch() {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
        // Call API to search products based on the image
    };

    return (
        <div>
            <h2>Search Products by Image</h2>
            <input type="file" onChange={handleImageUpload} />
            {image && <p>Uploaded Image: {image.name}</p>}
        </div>
    );
}

export default ProductSearch;