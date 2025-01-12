



import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createProductApi } from '../../apis/Api';

const PostCard = ({ isOpen, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        try {
            const response = await createProductApi(formData);
            if (response.status === 201) {
                toast.success('Product added successfully!');
                onClose(); // Close modal after successful submission
            }
        } catch (error) {
            toast.error('Failed to add product. Please try again!');
        }
    };

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create a New Product</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">

                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <input type="number" className="form-control" placeholder="Enter product price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            <select className="form-control" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                                <option value="home_repair">Home Repair</option>
                                <option value="electronics">Tutor</option>
                                <option value="gadgets">Garden Maintenance</option>
                                <option value="furniture">Cleaning</option>
                            </select>
                            <textarea className="form-control" placeholder="Enter description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                            <input type="file" className="form-control" onChange={handleImageChange} />
                            {previewImage && <img src={previewImage} alt="Preview" className="img-fluid rounded mt-2" />}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
