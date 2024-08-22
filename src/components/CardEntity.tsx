import { Link, Params, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { toggleItem } from "../redux/slices/CardList";

type Item = {
  id: string;
  title: string;
  image: string;
  isLike: boolean;
  description: string;
};

const CardEntity = () => {
  const dispatch = useAppDispatch();

  const param: Readonly<Params<string>> = useParams();

  const item: Item | undefined = useAppSelector(
    (state) => state.cardList.list
  ).find((x) => x.id == param.id?.toString());

  return (
    <>
      <Link to={"/d24-test/"}>Co Back To list</Link>
      <h2>{item?.title}</h2>
      <img className="entityImg" src={item?.image} alt="" />
      {/* <input
        type="checkbox"
        checked={item?.isLike}
        onChange={() => dispatch(toggleItem(item?.id ?? ""))}
      /> */}
      <div
        className="likerboxEntity"
        onClick={() => dispatch(toggleItem(item?.id ?? ""))}
      >
        <input
          id="heart"
          className="isLikeCheckbox"
          type="checkbox"
          checked={item?.isLike}
          onChange={() => dispatch(toggleItem(item?.id ?? ""))}
        />
        <label htmlFor="heart"></label>
      </div>
      <p className="entityDescription">{item?.description}</p>
    </>
  );
};

export default CardEntity;
