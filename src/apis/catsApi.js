/**
 * Performs an http get request to the cat api
 */
const get = (path) => {
  return fetch(`https://api.thecatapi.com${path}`, {
    headers: {
      api_key: "ef72570ff371408f9668e414353b7b2e",
    },
  }).then((res) => res.json());
};

const catsApi = {
  /**
   * paginated search API for cats
   */
  imagesSearch({
    limit = 6, // Page size
    page, // the page to get (starts at 0)
    size = "small", // image size - do not touch
    categoryIds = [], // filter images by a list of category ids
    breedIds = [], // filter images by a list of breed ids
    order = "Desc", // Order. Do no touch
  }) {
    const searchParams = new URLSearchParams();
    searchParams.set("limit", limit);
    searchParams.set("page", page);
    searchParams.set("size", size);
    searchParams.set("order", order);
    categoryIds.forEach((id) => searchParams.append("category_ids", id));
    breedIds.forEach((id) => searchParams.append("breed_ids", id));
    return get(`/v1/images/search?${searchParams.toString()}`);
  },

  /**
   * Search breeds by search string
   */
  breedsSearch({ search }) {
    return get(`/v1/breeds/search?q=${search}`);
  },
  /**
   * Get all categories
   */
  getCategories() {
    return get(`/v1/categories`);
  },
};

export default catsApi;

