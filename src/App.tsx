import "./App.css";
import { useForm } from "react-hook-form";
import { validationSchema } from "./utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchInput from "./SearchInput";
import DebounceSearchInput from "./DebounceSearchInput";

type LoginForm = {
  name: string;
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div>
      <div className="form-container">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="名前">名前</label>
          <input type="text" id="name" {...register("name")} />
          <p>{errors.name?.message as React.ReactNode}</p>
          <label htmlFor="メールアドレス">メールアドレス</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "メールアドレス必須" })}
          />
          <p>{errors.email?.message as React.ReactNode}</p>
          <label htmlFor="パスワード">パスワード</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "パスワード必須" })}
          />
          <p>{errors.password?.message as React.ReactNode}</p>
          <button type="submit">送信</button>
        </form>
      </div>
      <br />
      <SearchInput />
      <br />
      <DebounceSearchInput />
    </div>
  );
}

export default App;
