import React, { useState } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
  onSearch?: (query: string) => void; // Função opcional para lidar com a pesquisa
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery); // Chama a função de pesquisa, se fornecida
    } else {
      // Redireciona para a página Home com o termo de pesquisa na URL
      window.location.href = `/home?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar empresas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Campo de busca de empresas"
          />
          <button type="submit" className="search-button" aria-label="Buscar">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;