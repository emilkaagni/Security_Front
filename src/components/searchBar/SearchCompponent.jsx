import React, { useState } from 'react';
import SearchBar from '../searchBar/Searchbar';

const MainComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [professionals, setProfessionals] = useState([
        { id: 1, name: 'John Doe', profession: 'Psychologist' },
        { id: 2, name: 'Jane Smith', profession: 'Plumber' },
        { id: 3, name: 'Mary Johnson', profession: 'Tutor' },
        { id: 4, name: 'James Brown', profession: 'Cleaner' },
        { id: 5, name: 'Patricia Taylor', profession: 'Home Repair' },
        // Add more professionals as needed
    ]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredProfessionals = professionals.filter((professional) =>
        professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.profession.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ul>
                {filteredProfessionals.map((professional) => (
                    <li key={professional.id}>
                        {professional.name} - {professional.profession}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainComponent;
