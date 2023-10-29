// UserSearch.js
import React from "react";
import { debounce } from "lodash";
import "./userSearch.css";

function UserSearch({ handleSearch }) {
  const debouncedSearch = debounce((value) => {
    handleSearch(1, value);
  }, 500);
  return (
    <div>
      <input
        type="text"
        className="inputBox"
        placeholder="Search GitHub users"
        onChange={(e) => {
          debouncedSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default UserSearch;
