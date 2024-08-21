import React, { useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { TextField, Button } from "@mui/material";

interface FormValues {
  searchField: string;
}

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

function SearchInput() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      searchField: "",
    },
  });

  const searchFieldValue = useWatch({
    control,
    name: "searchField",
  });

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
  }, 500);

  useEffect(() => {
    console.log("入力");
    if (searchFieldValue === "students") {
      handleSubmit(onSubmit)(); // 自動的にフォームを送信
    }
  }, [searchFieldValue, handleSubmit]);

  const onSubmit = (data: FormValues) => {
    console.log("data:", data);
    console.log("data.searchField:", data.searchField);
    debouncedSearch(data.searchField);
  };

  return (
    <form>
      <Controller
        name="searchField"
        control={control}
        defaultValue=""
        rules={{ required: "このフィールドは必須です" }} // エラーメッセージを設定
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            autoComplete="off"
            label="Example Field"
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

export default SearchInput;
