import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../apis/Api";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/searchBar/Searchbar";
import './homePage.css';
const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                console.log("Fetched Products:", res.data.products);
                setProducts(res.data.products);
                setFilteredProducts(res.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        console.log("Search Term for Filtering:", searchTerm);
        const filtered = products.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Filtered Products:", filtered);
        setFilteredProducts(filtered);
    };

    return (
        <>
            <div className="container">
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="http://localhost:5500/products/1720022102194-Online%20consultations%20with%20a%20psychologist.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Online Consultations</h5>
                                <p>Find your Psychologist Online</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="http://localhost:5500/products/1720022961908-Online%20consultations%20with%20a%20psychologist-2.png" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Cleaning services</h5>
                                <p>Clean your house</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Tshirt on Sale</h5>
                                <p>Cotton Fiber Tshirt and Glass</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div>
                    <SearchBar onSearch={handleSearch} />
                </div>

                <h2 className="mt-2">Available Products</h2>

                {/* First Row of Products */}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {filteredProducts.slice(0, 8).map((singleProduct) => (
                        <div className="col" key={singleProduct._id}>
                            <ProductCard productInformation={singleProduct} color={'green'} />
                        </div>
                    ))}
                </div>

                {/* Small Carousel Slider */}
                <div id="smallCarousel" className="carousel slide small-carousel mt-4 mb-4">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="http://localhost:5500/products/1720022102194-Online%20consultations%20with%20a%20psychologist.png" className="d-block w-100 small-carousel-image" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="http://localhost:5500/products/1720022961908-Online%20consultations%20with%20a%20psychologist-2.png" className="d-block w-100 small-carousel-image" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100 small-carousel-image" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#smallCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#smallCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Second Row of Products */}
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {filteredProducts.slice(8).map((singleProduct) => (
                        <div className="col" key={singleProduct._id}>
                            <ProductCard productInformation={singleProduct} color={'green'} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Homepage;