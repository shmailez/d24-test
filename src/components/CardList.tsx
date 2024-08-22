// import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../hooks/hook";
import CardItem from "./CardItem";

type Item = {
  id: string;
  title: string;
  image: string;
  isLike: boolean;
  description: string;
};

const CardList = () => {
  const list = useAppSelector<Item[]>((state) => state.cardList.list);

  const likeList = list.filter((item) => item.isLike === true);

  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button onClick={() => setToggle((toggle) => !toggle)}>
        {toggle ? "Show isLike" : "Show All"}
      </button>
      {toggle ? (
        <div className="cardList">
          {list.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="cardList">
          {likeList.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </>
  );
};

export default CardList;
