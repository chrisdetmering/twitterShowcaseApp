import React from "react";

function UserInput(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
      onChange={props.handleChange}
        style={{
          justifyContent: "center",
          paddingTop: "20px",
          paddingLeft: "25px",
          paddingRight: "25px",
        }}
        type="text"
        placeholder="Search for User"
        />
    </form>
  );
}

export default UserInput;
