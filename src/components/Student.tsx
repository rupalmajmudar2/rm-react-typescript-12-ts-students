import * as React from "react";
import StudentModel from "../models/StudentModel";
import { useQuery } from "react-query";

interface StudentProps {
  studentModel?: string;
}

interface StudentState {

}

/*function Query(props: any) {
  console.log("Props=", props);
  return props.children(useQuery(props.keyName, props.fn, props.options));
}*/

//https://codesandbox.io/s/example-using-react-query-as-render-props-in-a-class-component-7vjlu?file=/src/App.js:116-216
export class StudentComponent extends React.Component<StudentProps, StudentState> {

  onButtonClick = (): void => {
    //this.setState(studentModel: "123");
    //later. this.setState({loading: true})
    //this.renderList();
  };
  render() {
    return (
      <div className="container">
        <>
          <h3>Start a Student Component3</h3>
          <h3>i.e. {this.props.studentModel}</h3>
        </>
      </div>
    );
  }
}