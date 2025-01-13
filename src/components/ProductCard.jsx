// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const ProductCard = ({ productInformation, color }) => {

//     return (
//         <>
//             {/* Define the width of the card */}
//             <div className="card" style={{ width: '18rem' }}>

//                 <span style={{
//                     backgroundColor: color
//                 }} className='badge position-absolute top-0'>{productInformation.productCategory}</span>

//                 <img src={`http://localhost:5500/products/${productInformation.productImage}`}
//                     className="card-img-top"
//                     alt="Product"
//                     style={{
//                         width: '100%',
//                         height: '200px',
//                         objectFit: 'cover',
//                         border: '1px solid #ddd'
//                     }} />
//                 <div className="card-body">

//                     <div className='d-flex justify-content-between'>
//                         <h5 className="card-title">{productInformation.productName}</h5>
//                         <h5 className="card-title text-danger">NPR.{productInformation.productPrice}</h5>
//                     </div>

//                     <p className="card-text">{productInformation.productDescription.slice(0, 30)}</p>
//                     <a href="#" className="btn btn-outline-dark w-100">view more</a>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ProductCard;



import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ productInformation, color }) => {
    return (
        <>
            {/* Define the width of the card */}
            <div className="card" style={{ width: '18rem' }}>

                <span style={{
                    backgroundColor: color
                }} className='badge position-absolute top-0'>{productInformation.productCategory}</span>

                <img src={`http://localhost:5500/products/${productInformation.productImage}`}
                    className="card-img-top"
                    alt="Product"
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        border: '1px solid #ddd'
                    }} />
                <div className="card-body">

                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{productInformation.productName}</h5>
                        <h5 className="card-title text-danger">NPR.{productInformation.productPrice}</h5>
                    </div>

                    <p className="card-text">{productInformation.productDescription.slice(0, 30)}</p>
                    <Link to={`/product/${productInformation._id}`} className="btn btn-outline-dark w-100">View more</Link>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
