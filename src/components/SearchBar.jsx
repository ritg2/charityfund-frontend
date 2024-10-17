import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = searchQuery;
    navigate(`/search?search=${search}`);
  };

  return (
    <div className="flex justify-center my-3">
      <form onSubmit={handleSubmit} className="relative w-full md:w-96">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute pt-3 pl-3 dark:text-white"
        />
        <input
          className="w-full p-2 pl-10 border border-solid rounded-full focus:outline-none border-cyan-dark hover:bg-gray-100 dark:text-white dark:bg-dark-cyan-dark"
          type="search"
          placeholder="search"
          onChange={handleSearch}
          value={searchQuery}
        />
      </form>
    </div>
  );
}
