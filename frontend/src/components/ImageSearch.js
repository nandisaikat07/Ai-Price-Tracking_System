import React, { useState } from 'react';
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ImageSearch = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Simulate upload and processing
    setUploading(true);
    try {
      // Here you would normally upload the image to your server
      // and get similar products back
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      toast.success('Image processed successfully!');
      // You would then handle the response and show similar products
    } catch (error) {
      toast.error('Failed to process image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div
        className={`image-upload relative ${
          dragActive ? 'border-blue-600 bg-blue-50' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept="image/*"
          disabled={uploading}
        />
        
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 rounded-lg mx-auto"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <FaSpinner className="text-white text-3xl animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <FaCamera className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">
              Drag and drop an image or click to upload
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, WEBP (max 5MB)
            </p>
          </div>
        )}
      </div>

      {preview && !uploading && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setPreview(null);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Upload Another Image
          </button>
        </div>
      )}

      {/* Results Section - Would be populated with actual results */}
      {preview && !uploading && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Placeholder for similar products */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="h-32 bg-gray-200 rounded-md mb-2"></div>
                <p className="font-medium">Product Name</p>
                <p className="text-blue-600">$XX.XX</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearch; 