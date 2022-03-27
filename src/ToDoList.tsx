import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";
// const ToDoList = () => {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={toDo}
//           onChange={onChange}
//           placeholder="Write a to do"
//         ></input>
//         <button>Add</button>
//         {toDoError !== "" && toDoError}
//       </form>
//     </div>
//   );
// };
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}
const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    console.log(data);
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline" });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="email"
        ></input>
        <span>{errors?.email?.message}</span>
        <input
          {...register("username", {
            required: "username required",
            minLength: 10,
          })}
          placeholder="username"
        ></input>
        <span>{errors?.username?.message}</span>
        <input
          {...register("firstName", {
            required: "firstName required",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nico allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="firstName"
        ></input>
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: "lastName required",
          })}
          placeholder="lastName"
        ></input>
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("password", {
            required: "password required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="password"
        ></input>
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password1 is required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="password1"
        ></input>
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};
export default ToDoList;
