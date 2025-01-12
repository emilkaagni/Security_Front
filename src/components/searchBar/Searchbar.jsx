// // import React, { useState } from 'react';
// // import './SearchBar.css';

// // const SearchBar = ({ onSearch }) => {
// //     const [searchTerm, setSearchTerm] = useState('');

// //     const handleInputChange = (e) => {
// //         setSearchTerm(e.target.value);
// //     };

// //     const handleSearch = () => {
// //         onSearch(searchTerm);
// //     };

// //     return (
// //         <div className="search-bar-container">
// //             <h2>Who are you looking for today?</h2>
// //             <div className="search-bar">
// //                 <input
// //                     type="text"
// //                     value={searchTerm}
// //                     onChange={handleInputChange}
// //                     placeholder="Search your professional..."
// //                 />
// //                 <button onClick={handleSearch}>Search</button>
// //             </div>
// //             <div className="search-bar-categories">
// //                 <div className="search-bar-category">For you</div>
// //                 <div className="search-bar-category">Psychologist</div>
// //                 <div className="search-bar-category">Plumber</div>
// //                 <div className="search-bar-category">Tutor</div>
// //                 <div className="search-bar-category">Cleaner</div>
// //                 <div className="search-bar-category">Home Repair</div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SearchBar;



// import React, { useState } from 'react';
// import './SearchBar.css';

// const SearchBar = ({ onSearch }) => {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleInputChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSearch = () => {
//         onSearch(searchTerm);
//     };

//     return (
//         <div className="search-bar-container">
//             <h2>Who are you looking for today?</h2>
//             <div className="search-bar">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     placeholder="Search your professional..."
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             <div className="search-bar-categories">
//                 <div className="search-bar-category">For you</div>
//                 <div className="search-bar-category">Psychologist</div>
//                 <div className="search-bar-category">Plumber</div>
//                 <div className="search-bar-category">Tutor</div>
//                 <div className="search-bar-category">Cleaner</div>
//                 <div className="search-bar-category">Home Repair</div>
//             </div>
//         </div>
//     );
// };

// export default SearchBar;



import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-bar-container">
            <h2>Who are you looking for today?</h2>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search your professional..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
           
        </div>
    );
};

export default SearchBar;
