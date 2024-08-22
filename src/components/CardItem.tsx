import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hook";
import { deleteCard, toggleItem } from "../redux/slices/CardList";

type Item = {
  id: string;
  title: string;
  image: string;
  isLike: boolean;
  description: string;
};

const CardItem: React.FC<Item> = (props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${props.id}`);
  };

  const handleLikeClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(toggleItem(props.id));
  };

  const handleDeleteClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    dispatch(deleteCard(props.id));
  };

  return (
    <>
      <div className="cardItem" onClick={() => handleCardClick()}>
        <h2>{props.title}</h2>
        <img src={props.image} alt="" />

        <div className="likerbox" onClick={handleLikeClick}>
          <input
            id="heart"
            className="isLikeCheckbox"
            type="checkbox"
            checked={props.isLike}
            onChange={handleLikeClick}
          />
          <label htmlFor="heart"></label>
        </div>
        <span onClick={handleDeleteClick}>🗑️</span>
        {/* <button onClick={handleDeleteClick}>🗑️</button> */}
        <p>{props.description}</p>
      </div>
    </>
  );
};

export default CardItem;
