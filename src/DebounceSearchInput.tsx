import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

//jsでのdebounce
// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(context, args);
//     }, wait);
//   };
// }

//tsでのdebounce
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: number | undefined;
  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  } as T;
}

function DebounceSearchInput() {
  const { control, handleSubmit } = useForm();

  const debouncedSearch = debounce((query) => {
    console.log("debounce");
    console.log("query:", query);
    const url = `https://hp-api.onrender.com/api/characters/${query}`;
    console.log("params", query);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data:", data);
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
      });
  }, 1000);

  const onSubmit = (data: any) => {
    // console.log("data:", data);
    console.log("data.debounceSearchField:", data.debounceSearchField);
    debouncedSearch(data.debounceSearchField);
  };

  return (
    <form onChange={handleSubmit(onSubmit)}>
      <Controller
        name="debounceSearchField"
        control={control}
        defaultValue=""
        rules={{ required: "このフィールドは必須です" }} // エラーメッセージを設定
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            autoComplete="off"
            label="debounce search field"
            variant="outlined"
            type="text"
            error={!!fieldState.error} // バリデーションエラーがある場合にエラー表示
            helperText={fieldState.error ? fieldState.error.message : ""} // エラーメッセージを表示
          />
        )}
      />
    </form>
  );
}

export default DebounceSearchInput;
