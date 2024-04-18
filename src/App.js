import React, { useState, useEffect } from "react";
import catsApi from "./apis/catsApi";
import Cat from "./components/Cat";
import CategorySelect from "./components/CategorySelect";
import BreedTypeahead from "./components/BreedTypeahead";

const PAGE_LIMIT = 6;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBreedId, setSelectedBreedId] = useState("");

  // Get cat images based on category
  useEffect(() => {
    setLoading(true);
    catsApi
      .imagesSearch({
        limit: PAGE_LIMIT,
        page,
        categoryIds: selectedCategoryId ? [selectedCategoryId] : [],
        breedIds: selectedBreedId ? [selectedBreedId] : []
      })
      .then((data) => {
        setLoading(false);
        setCats(page === 0 ? data : [...cats, ...data]);
      })
      .catch((err) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedCategoryId, selectedBreedId]);

  const onCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setPage(0);
  };

  const onChangeBreed = (breedId) => {
    setSelectedBreedId(breedId);
    setPage(0);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="app">
      <h1>Cat Gallery</h1>
      <div className="toolbar--top">
        <CategorySelect
          value={selectedCategoryId}
          onChange={onCategoryChange}
        />
        <BreedTypeahead onItemClick={onChangeBreed} />
      </div>
      <ul className="cat-list">
        {cats.map((cat, idx) => {
          return (
            <li key={`${cat.id}-${idx}`}>
              <Cat url={cat.url} />
            </li>
          );
        })}
        {cats.length === 0 ? <span>No 😿 for you</span> : null}
      </ul>
      <div className="toolbar--bottom">
        {cats.length ? (
          <button
            className="button"
            onClick={!loading ? onLoadMore : null}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

