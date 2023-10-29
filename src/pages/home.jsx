import React, { useEffect, useState } from "react";
import UserSearch from "../components/UserSearch";
import Table from "../components/Table";
import { fetchFollowersCount, searchUsers } from "../service/githubService";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (pageNumber = 1, value) => {
    const val = value !== undefined ? value : query;
    setQuery(val);
    if (val) {
      try {
        const response = await searchUsers(val, pageNumber);
        const data = response.data.items;

        // Set total pages based on response headers
        const linkHeader = response.headers.link;
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            const lastPage = parseInt(match[1]);
            setTotalPages(lastPage);
          }
        }

        // Fetch additional user data followers count
        const usersWithAdditionalData = await Promise.all(
          data.map(async (user) => {
            const followersCount = await fetchFollowersCount(user?.login);
            return {
              ...user,
              followers: followersCount,
            };
          })
        );
        setResults(usersWithAdditionalData);
        setCurrentPage(pageNumber);
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]);
    }
  };
  useEffect(() => {
    if (!query) {
      setResults([]);
    }
  }, [query]);
  return (
    <div>
      <UserSearch
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {results.length ? (
        <Table
          results={results}
          handleSearch={handleSearch}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : null}
    </div>
  );
};

export default Home;
