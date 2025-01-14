// import React, { useEffect, useState } from 'react';
// import { getUserWishlist } from '../../apis/Api';
// import './wishlistPage.css';

// const WishlistPage = () => {
//     const [wishlistItems, setWishlistItems] = useState([]);

//     useEffect(() => {
//         getUserWishlist().then((res) => {
//             if (res.data.success) {
//                 setWishlistItems(res.data.data);
//             }
//         }).catch((error) => {
//             console.error('Error fetching wishlist:', error);
//         });
//     }, []);

//     if (wishlistItems.length === 0) {
//         return <div className="wishlist-container">Your wishlist is empty.</div>;
//     }

//     return (
//         <div className="wishlist-container">
//             <h2>Your Wishlist</h2>
//             <div className="wishlist-items">
//                 {wishlistItems.map((item, index) => (
//                     <div key={index} className="wishlist-item">
//                         <img
//                             src={`http://localhost:5500/products/${item.productImage}`}
//                             alt={item.productName}
//                             className="wishlist-item-image"
//                         />
//                         <div className="wishlist-item-details">
//                             <h3>{item.productName}</h3>
//                             <p>Price: NPR. {item.productPrice}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default WishlistPage;


import React, { useEffect, useState } from 'react';
import { getUserWishlist, removeFromWishlist } from '../../apis/Api'; // Import the removeFromWishlist function
import './wishlistPage.css';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // for testing comment this from 
        getUserWishlist().then((res) => {
            if (res.data.success) {
                setWishlistItems(res.data.data);
            }
        }).catch((error) => {
            console.error('Error fetching wishlist:', error);
        });
        // to this
    }, []);

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId).then(() => {
            setWishlistItems(wishlistItems.filter(item => item._id !== productId));
        }).catch((error) => {
            console.error('Error removing item from wishlist:', error);
        });
    };

    if (wishlistItems.length === 0) {
        return <div className="wishlist-container">Your wishlist is empty.</div>;
    }

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            <div className="wishlist-items">
                {wishlistItems.map((item, index) => (
                    <div key={index} className="wishlist-item">
                        <img
                            src={`http://localhost:5500/products/${item.productImage}`}
                            alt={item.productName}
                            className="wishlist-item-image"
                        />
                        <div className="wishlist-item-details">
                            <h3>{item.productName}</h3>
                            <p>Price: NPR. {item.productPrice}</p>
                            <button
                                onClick={() => handleRemoveFromWishlist(item._id)}
                                className="wishlist-remove-btn"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;