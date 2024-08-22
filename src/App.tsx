import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./hooks/hook";
import BasePage from "./pages/BasePage";
import { fetchCardList } from "./redux/slices/CardList";
import { Route, Routes } from "react-router-dom";
import CardPage from "./pages/CardPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCardList());
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/:id" element={<CardPage />} />
      </Routes>
    </>
  );
}

export default App;
