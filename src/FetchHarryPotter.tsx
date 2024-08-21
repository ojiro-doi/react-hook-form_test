import React, { useState } from "react";

const FetchHarryPotter = () => {
  const [posts, setPosts] = useState([]);

  const debouncedSearch = debounce((query) => {
    fetch(`https://hp-api.onrender.com/api/characters/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  }, 500);
  return <div>hello</div>;
};

export default FetchHarryPotter;
