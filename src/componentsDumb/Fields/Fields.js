import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { Field } from "redux-form";

const getValidityClassName = meta => {
  if (meta) {
    return "async-validating";
  }
  if (meta.active) {
    return;
  }
  if (meta.touched && meta.invalid) {
    return "invalid";
  }
  if (meta.touched && meta.valid) {
    return "valid";
  }
};

export const customInput = props => {
  const { label, input, type, meta, disabled } = props;
  return (
    <div
      className={cx(
        "custom-input-container",
        { "flex-row-reverse": type === "checkbox" },
        { dirty: meta.dirty },
        getValidityClassName(meta)
      )}
    >
      <label>{label}</label>
      <input
        className={props.className}
        {...input}
        name={props.name}
        type={props.type}
        autoFocus={props.autoFocus}
        disabled={disabled}
        placeholder={`${props.placeholder}`}
        handlechange={props.handleChange}
      />
      {meta.error && meta.touched && !meta.active && (
        <div className="feedback-text error-text">{meta.error}</div>
      )}
    </div>
  );
};

export const customRadio = props => {
  const { values, checkedValue } = props;
  let langEngTrue = localStorage.getItem("locale") === "en_us" ;
  return (
    <div className={langEngTrue?"custom-radioEng":"custom-radio"}>
      <label>{props.label}</label>
      <div className={langEngTrue?"custom-radio-containerEng":"custom-radio-container"}>
        {props.values.map((value, key) => {
          return (
            //<label for={`contactChoice${key}`}>
            <label key={key}>
              <p style={{ marginLeft: 5 }}>{value.text}</p>
              <input
                {...props.input}
                type="radio"
                id={`${props.radioID}${key}`}
                name={`${props.radioID}`}
                value={`${value.value}`}
                defaultChecked={checkedValue == value.value ? "true" : ""}
                className={props.className}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export const customTextArea = props => {
  const { label, input, type, meta, disabled } = props;
  return (
    <div
      className={cx(
        "custom-input-container",
        { "flex-row-reverse": type === "checkbox" },
        { dirty: meta.dirty },
        getValidityClassName(meta)
      )}
    >
      <label>{label}</label>
      <textarea
        className={props.className}
        {...input}
        name={props.name}
        type={props.type}
        autoFocus={props.autoFocus}
        disabled={disabled}
        placeholder={`${props.placeholder}`}
        handlechange={props.handleChange}
      />
      {meta.error && meta.touched && !meta.active && (
        <div className="feedback-text error-text">{meta.error}</div>
      )}
    </div>
  );
};
// const {
//   isLoading,
//   headerFooterData,
//   giftCardData,
//   form,
//   formData
// } = this.props;
export const customSelectComp = props => {
  const { price_one, price_two, price_three } = props.giftCardData;
  return (
    <div>
      <label>{props.label}</label>
      <select {...props.input} className={props.className} value={props.value}>
        {/* <option value="spaces">169</option> */}
        <option value="Price is not selected">{props.visibleValue}</option>
        <option value={`${price_one}`}>{price_one}</option>
        <option value={`${price_two}`}>{price_two}</option>
        <option value={`${price_three}`}>{price_three}</option>
      </select>
    </div>
  );
};
const mapStateToProps = state => ({
  giftCardData: state.giftCardPage.data
});

export const customSelect = connect(mapStateToProps)(customSelectComp);

// export const discounts = ({ fields }) => (
//   <div className="custom-fields-array-container">
//     {fields.map((code, index) => (
//       <div key={index} className="field-array-item">
//         <Field
//           name={code}
//           type="text"
//           component={customInput}
//           labe={`Discount Code #${index + 1}`}
//           autoFocus
//         />
//         <button type="button" onClick={() => fields.remove(index)}>
//           &times;
//         </button>
//       </div>
//     ))}
//     <button type="button" onClick={() => fields.push()}>
//       Add{!fields.length ? "Discount Code(s)" : "Another"}
//     </button>
//   </div>
// );
