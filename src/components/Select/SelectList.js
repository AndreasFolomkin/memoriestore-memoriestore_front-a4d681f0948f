import React, { useState } from "react";
import Select from "./Select";
import "./Select.css";

const SelectList = props => {
  const [list, setList] = useState([]);

  const addComment = comment => {
    if (comment.selectComment !== "") {
      setList([...list, comment]);
      props.addNewElem(comment); // add to global array
    }
  };
  const removeComment = id => {
    setList(list.filter(item => item.id !== id));
  };
  let pagesArray = [];
  for (let i = 1; i <= props.pagesArray; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="select-list-container">
      <Select
        selectArray={props.selectArray}
        addComment={addComment}
        pagesArray={pagesArray}
        placeholder={props.placeholder}
        addButton={props.addButton}
      />
      <ul>
        {list.map((item, key) => {
          return (
            <li key={key.id}>
              <div
                onClick={() => removeComment(item.id)}
                className="comment-delete-button"
              >
                X
              </div>
              <p>
                {`${props.pagesText}:${item.selectPage},  ${
                  item.selectComment
                }`}
                <br />
                <br />
                <span>{item.text}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectList;
