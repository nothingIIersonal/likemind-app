import React from "react";

function DataFieldText(props) {
  return (
    <>
      <span className={props.className}>
        <p>{props.title}:</p>
      </span>
      {props.editable === undefined || props.editable === false ? (
        <span className={props.className + "-val"}>{props.defaultValue}</span>
      ) : (
        <span className={props.className + "-val"}>
          {props.editMode === undefined || props.editMode === false ? (
            props.defaultValue
          ) : (
            <input
              value={props.updValue}
              placeholder={props.title}
              type={props.updType}
              onChange={(e) => props.updCallback(e.target.value)}
            />
          )}
        </span>
      )}
    </>
  );
}

function DataFieldDDL(props) {
  return (
    <>
      <span className={props.className}>
        <p>{props.title}:</p>
      </span>
      {props.editable === undefined || props.editable === false ? (
        <span className={props.className + "-val"}>{props.defaultValue}</span>
      ) : (
        <span className={props.className + "-val"}>
          {props.editMode === undefined || props.editMode === false ? (
            props.defaultValue
          ) : (
            <select
              defaultValue={props.updValue}
              onChange={(e) => props.updCallback(e.target.value)}
            >
              {props.options.map((option) => {
                return <option key={option}>{option}</option>;
              })}
            </select>
          )}
        </span>
      )}
    </>
  );
}

export { DataFieldText, DataFieldDDL };
