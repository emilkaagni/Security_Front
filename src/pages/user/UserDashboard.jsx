// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { createProductApi, deleteProduct, getAllProductsAuth } from '../../apis/Api';
// import './userDashboard.css';

// const UserDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [productCategory, setProductCategory] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [productImage, setProductImage] = useState('');
//     const [previewImage, setPreviewImage] = useState('');

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = () => {
//         getAllProductsAuth().then((res) => {
//             if (res.data.success) {
//                 setProducts(res.data.products);
//             } else {
//                 alert(res.data.message); // Using alert instead of toast for simplicity
//             }
//         }).catch((error) => {
//             console.error("Error fetching products:", error);
//             alert("Failed to fetch products");
//         });
//     };

//     const handleImage = (event) => {
//         const file = event.target.files[0];
//         setProductImage(file);
//         setPreviewImage(URL.createObjectURL(file));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('productName', productName);
//         formData.append('productPrice', productPrice);
//         formData.append('productCategory', productCategory);
//         formData.append('productDescription', productDescription);
//         formData.append('productImage', productImage);

//         createProductApi(formData).then((res) => {
//             if (res.status === 201) {
//                 alert(res.data.message);
//                 fetchProducts();
//                 clearForm();
//             }
//         }).catch((error) => {
//             console.error("Error creating product:", error);
//             alert("Something went wrong!");
//         });
//     };

//     const clearForm = () => {
//         setProductName('');
//         setProductPrice('');
//         setProductCategory('');
//         setProductDescription('');
//         setProductImage('');
//         setPreviewImage('');
//     };

//     const handleDelete = (id) => {
//         const confirmDialog = window.confirm("Are you sure you want to delete?");
//         if (confirmDialog) {
//             deleteProduct(id).then((res) => {
//                 if (res.status === 201) {
//                     alert(res.data.message);
//                     fetchProducts();
//                 }
//             }).catch((error) => {
//                 console.error("Error deleting product:", error);
//                 alert("Something went wrong!");
//             });
//         }
//     };

//     return (
//         <div className='dashboard-container'>
//             <div className='dashboard-menu'>
//                 <Link to="/user/dashboard" className='dashboard-menu-item active'>Dashboard</Link>
//                 <Link to="/appointment" className='dashboard-menu-item'>Booking Inquiry</Link>
//             </div>
//             <div className='dashboard-header'>
//                 <h3>User Dashboard</h3>
//                 <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
//                     Add Product
//                 </button>
//             </div>

//             {/* Modal for Adding a Product */}
//             <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="addProductModalLabel">Create a New Product</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label className="form-label">Product Name</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Enter product name"
//                                         value={productName}
//                                         onChange={(e) => setProductName(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Product Price</label>
//                                     <input
//                                         type="number"
//                                         className="form-control"
//                                         placeholder="Enter product price"
//                                         value={productPrice}
//                                         onChange={(e) => setProductPrice(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Category</label>
//                                     <select
//                                         className="form-select"
//                                         value={productCategory}
//                                         onChange={(e) => setProductCategory(e.target.value)}
//                                         required
//                                     >
//                                         <option value="">Select category</option>
//                                         <option value="Home Repair">Home Repair</option>
//                                         <option value="Tutor">Tutor</option>
//                                         <option value="Garden Maintenance">Garden Maintenance</option>
//                                         <option value="Cleaning">Cleaning</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Description</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="3"
//                                         value={productDescription}
//                                         onChange={(e) => setProductDescription(e.target.value)}
//                                         required
//                                     ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Product Image</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         onChange={handleImage}
//                                         required
//                                     />
//                                     {previewImage && <img src={previewImage} alt="Preview" className="img-fluid rounded mt-2 preview-image" />}
//                                 </div>
//                                 <div className="modal-footer">
//                                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                     <button type="submit" className="btn btn-primary">Save changes</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Products Table */}
//             <div className="table-responsive mt-4">
//                 <table className='table table-striped table-hover'>
//                     <thead className='table-dark'>
//                         <tr>
//                             <th scope="col">Image</th>
//                             <th scope="col">Name</th>
//                             <th scope="col">Price</th>
//                             <th scope="col">Category</th>
//                             <th scope="col">Description</th>
//                             <th scope="col">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.length > 0 ? (
//                             products.map((singleProduct) => (
//                                 <tr key={singleProduct._id}>
//                                     <td>
//                                         <img src={`http://localhost:5500/products/${singleProduct.productImage}`} alt={singleProduct.productName} className="img-thumbnail product-image" />
//                                     </td>
//                                     <td>{singleProduct.productName}</td>
//                                     <td>{singleProduct.productPrice}</td>
//                                     <td>{singleProduct.productCategory}</td>
//                                     <td>{singleProduct.productDescription}</td>
//                                     <td>
//                                         <Link to={`/product/update/${singleProduct._id}`} className='btn btn-sm btn-outline-primary me-2'>Edit</Link>
//                                         <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-sm btn-outline-danger'>Delete</button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center">No products available.</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProductApi, deleteProduct, getAllProductsAuth } from '../../apis/Api';
import './userDashboard.css';

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getAllProductsAuth().then((res) => {
            if (res.data.success) {
                setProducts(res.data.products);
            } else {
                alert(res.data.message);
            }
        }).catch((error) => {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products");
        });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setProductCategory(value);
        if (value !== "Other") {
            setCustomCategory('');
        }
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoryToUse = productCategory === "Other" ? customCategory : productCategory;

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', categoryToUse);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        createProductApi(formData).then((res) => {
            if (res.status === 201) {
                alert(res.data.message);
                fetchProducts();
                clearForm();
            }
        }).catch((error) => {
            console.error("Error creating product:", error);
            alert("Something went wrong!");
        });
    };

    const clearForm = () => {
        setProductName('');
        setProductPrice('');
        setProductCategory('');
        setCustomCategory('');
        setProductDescription('');
        setProductImage('');
        setPreviewImage('');
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteProduct(id).then((res) => {
                if (res.status === 201) {
                    alert(res.data.message);
                    fetchProducts();
                }
            }).catch((error) => {
                console.error("Error deleting product:", error);
                alert("Something went wrong!");
            });
        }
    };

    return (
        <div className='dashboard-container'>
            <div className='dashboard-menu'>
                <Link to="/user/dashboard" className='dashboard-menu-item active'>Dashboard</Link>
                <Link to="/appointment" className='dashboard-menu-item'>Booking Inquiry</Link>
            </div>
            <div className='dashboard-header'>
                <h3>User Dashboard</h3>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                    Add Product
                </button>
            </div>

            {/* Modal for Adding a Product */}
            <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModalLabel">Create a New Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter product name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Product Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter product price"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={productCategory}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="">Select category</option>
                                        <option value="Home Repair">Home Repair</option>
                                        <option value="Tutor">Tutor</option>
                                        <option value="Garden Maintenance">Garden Maintenance</option>
                                        <option value="Cleaning">Cleaning</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                {productCategory === "Other" && (
                                    <div className="form-group">
                                        <label className="form-label">Custom Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter custom category"
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Product Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImage}
                                        required
                                    />
                                    {previewImage && <img src={previewImage} alt="Preview" className="img-fluid rounded mt-2 preview-image" />}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="table-responsive mt-4">
                <table className='table table-striped table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((singleProduct) => (
                                <tr key={singleProduct._id}>
                                    <td>
                                        <img src={`http://localhost:5500/products/${singleProduct.productImage}`} alt={singleProduct.productName} className="img-thumbnail product-image" />
                                    </td>
                                    <td>{singleProduct.productName}</td>
                                    <td>{singleProduct.productPrice}</td>
                                    <td>{singleProduct.productCategory}</td>
                                    <td>{singleProduct.productDescription}</td>
                                    <td>
                                        <Link to={`/product/update/${singleProduct._id}`} className='btn btn-sm btn-outline-primary me-2'>Edit</Link>
                                        <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-sm btn-outline-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDashboard;