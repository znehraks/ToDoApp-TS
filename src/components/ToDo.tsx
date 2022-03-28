import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  localStorage.setItem("toDos", JSON.stringify(toDos));
  const onClick = (newCategory: Categories) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { id, text, category: newCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const removeToDo = (id: IToDo["id"]) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button
          name={Categories.DOING}
          onClick={() => onClick(Categories.DOING)}
        >
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button
          name={Categories.TO_DO}
          onClick={() => onClick(Categories.TO_DO)}
        >
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={() => onClick(Categories.DONE)}>
          Done
        </button>
      )}
      <button onClick={() => removeToDo(id)}>DELETE</button>
    </li>
  );
};

export default ToDo;
