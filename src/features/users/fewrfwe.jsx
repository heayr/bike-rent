import { Field, getIn, ErrorMessage } from "formik";
import { useState } from "react";
import DropdownOptionsStatus from "./DropdownOptionsStatus";
import styles from "./Form.module.scss";
import { OPTIONS_SEASON, OPTIONS_STATUS } from "@/constants/formRespConstants";

function Form({ formik, fields, typeForm, title, variant }) {
  const formattedName = (field) => `${typeForm}.${field}`;
  const touchFields = getIn(formik.touched, typeForm)
    ? Object.keys(getIn(formik.touched, typeForm)).length
    : 0;

  const disableMouseWheel = (e) => {
    e.target.blur();
  };
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  return (
    <>
      {variant === "create" && <h5 className={styles.form_title}>{title}</h5>}
      {fields.map(({ name, title, titleDesc, type, subtitle }) => (
        <div className={styles.label_wrapper} key={name}>
          {type === "checkbox" && (
            <label htmlFor="label_checkbox" className={styles.label_checkbox}>
              <h6 className={styles.form_subtitle_checkbox}>{title}</h6>
              <input
                className={styles.checkbox}
                type={type}
                value={getIn(formik.values, formattedName(name))}
                name={formattedName(name)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          )}
          {(type === "text" || type === "number") && (
            <div className={styles.label}>
              {variant == "response" && (
                <h6 className={styles.form_subtitle_resp}>{title}</h6>
              )}
              {variant == "create" && (
                <h4 className={styles.form_subtitle}>{title}</h4>
              )}
              <p className={styles.sublabel}>{titleDesc}</p>
              <input
                className={
                  getIn(formik.touched, formattedName(name)) &&
                  getIn(formik.errors, formattedName(name))
                    ? styles.input_error
                    : styles.input
                }
                type={type}
                value={getIn(formik.values, formattedName(name))}
                name={formattedName(name)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onWheel={(e) => e.target.blur()}
                placeholder={
                  type === "text" ? "Введите текст" : "Введите число"
                }
              />
            </div>
          )}
          {type === "select" && (
            <div className={styles.label}>
              {variant == "response" && (
                <h5 className={styles.form_subtitle}>{title}</h5>
              )}
              {variant == "create" && (
                <h4 className={styles.form_subtitle}>{title}</h4>
              )}
              {/* <DropdownOptionsStatus /> */}

              <h6 className={styles.sublabel_select}>{titleDesc}</h6>
              <p className={styles.select_subtitle}>{subtitle}</p>
              <div
                className={styles.custom_dropdown}
                onClick={(e) => setIsDropDownVisible(!isDropDownVisible)}
              >
                {isDropDownVisible === true && (
                  <div className={styles.select_container}>
                    <div
                      className={
                        getIn(formik.touched, formattedName(name)) &&
                        getIn(formik.errors, formattedName(name))
                          ? styles.input_error
                          : styles.select
                      }
                      value={getIn(formik.values, formattedName(name))}
                      name={formattedName(name)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {name === "best_season" &&
                        OPTIONS_SEASON.map((el, value) => (
                          <div
                            className={styles.options}
                            key={el}
                            value={el}
                            onClick={() => {
                              setSelectedItemIndex(value);
                            }}
                          >
                            {el}
                          </div>
                        ))}
                      {name === "best_status" &&
                        OPTIONS_STATUS.map((el, value) => (
                          <div
                            className={styles.options}
                            key={el}
                            value={el}
                            name={el}
                            onClick={() => {
                              setSelectedItemIndex(value);
                            }}
                          >
                            {/* <input
                              className={styles.radio}
                              id={el}
                              key={el}
                              value={el}
                              name={el}
                              type="radio"
                            /> */}
                            {el}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div
                  className={
                    // styles.selected
                    isDropDownVisible
                      ? styles.selected_visible
                      : styles.selected
                  }
                >
                  {selectedItemIndex != null
                    ? OPTIONS_SEASON[selectedItemIndex]
                    : "SELECT"}
                </div>
              </div>
            </div>
          )}
          {type === "textarea" && (
            <div className={styles.label}>
              {variant == "response" && (
                <h6 className={styles.form_subtitle}>{title}</h6>
              )}
              {variant == "create" && (
                <h4 className={styles.form_subtitle}>{title}</h4>
              )}
              <textarea
                className={
                  getIn(formik.touched, formattedName(name)) &&
                  getIn(formik.errors, formattedName(name))
                    ? styles.textarea_error
                    : styles.textarea
                }
                rows="3"
                value={getIn(formik.values, formattedName(name))}
                name={formattedName(name)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
          )}
          {getIn(formik.touched, formattedName(name)) && (
            <p className={styles.error_name}>
              {getIn(formik.errors, formattedName(name))}
            </p>
          )}
        </div>
      ))}
      {!formik.isValid && touchFields === fields.length && (
        <div
          className={
            variant === "response"
              ? styles.error_field_grid
              : styles.error_field
          }
        >
          Пожалуйста, заполните все обязательные поля{" "}
        </div>
      )}
    </>
  );
}
export default Form;
