import * as React from "react";

let Logo = "https://cdn.sanity.io/images/mr2nzgx7/production/2bbda3ac3019d03d434b6cbb344f6e72c7ba7daf-4936x3221.png?w=3840&h=2506&auto=format";
export default class FirstComponent extends React.Component<{}> {
  render() {
    return (
      <div>
        <h3>A Simple React Component Example with Typescript</h3>
        <div>
          <img height="250" src={Logo} alt="noimg" />
        </div>
      </div>
    );
  }
}