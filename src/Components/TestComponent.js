import React from "react";

const TestComponent = (props) => {
  return (
    <div>
        <h1>Voici votre compte avec une variable let : {props.points}</h1>
        <button onClick={props.functionClick}>Appuyez ICI</button>
    </div>
  ) 
}
export default TestComponent