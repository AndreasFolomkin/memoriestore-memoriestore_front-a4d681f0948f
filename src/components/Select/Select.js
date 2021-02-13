import React, { useState } from "react";
import "./Select.css";

const Select = props => {
  let { selectArray, pagesArray, addButton } = props;
  const [selectComment, setSelectComment] = useState(selectArray[0].title);
  const [selectPage, setSelectPage] = useState(pagesArray[0]);
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let comment = { selectPage, selectComment, text };
    comment["id"] = Math.random();
    props.addComment(comment);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="select-container">
        <select
          value={selectComment}
          onChange={e => setSelectComment(e.target.value)}
        >
          {selectArray.map((item, key) => {
            return (
              <option value={item.title} key={key}>
                {item.title}
              </option>
            );
          })}
        </select>
        <select
          value={selectPage}
          onChange={e => setSelectPage(e.target.value)}
        >
          {pagesArray.map((item, key) => {
            return (
              <option value={item} key={key}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="leave-a-feedback">
        <input
          placeholder={props.placeholder}
          onChange={e => setText(e.target.value)}
          value={text}
        />
        <button type="submit">{addButton}</button>
      </div>
    </form>
  );
};

export default Select;
