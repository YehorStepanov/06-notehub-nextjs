import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps{
  onChange: (request: string)=>void
}

export default function SearchBox({onChange}:SearchBoxProps) {
  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
    onChange(value); 
  };
  
  return <input onChange={handleChange} value={text} className={css.input} type="text" placeholder="Search notes" />;
}
