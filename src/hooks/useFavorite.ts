import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToFavoriteList } from "../redux/slice/FavoriteProduct";
import { Product } from "../redux/middleware/ProductApi";

const useFavorite = (product: Product) => {
  const { favoriteList } = useSelector(
    (state: RootState) => state.FavoriteProducts
  );
  const item = favoriteList.find(
    (f) => f.product.product_id === product?.product_id
  );

  const [favorite, setFavorite] = useState(item ? item.favorite : false);

  const dispatch = useDispatch();

  const toggleFavorite = () => {
    setFavorite(!favorite);
    dispatch(addToFavoriteList({ product, favorite: !favorite }));
  };

  return { toggleFavorite, favorite };
};

export default useFavorite;
