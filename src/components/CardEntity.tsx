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
      <img src={item?.image} alt="" />
      <input
        type="checkbox"
        checked={item?.isLike}
        onChange={() => dispatch(toggleItem(item?.id ?? ""))}
      />
      <p>{item?.description}</p>
    </>
  );
};

export default CardEntity;
