import * as React from "react";
import StudentModel from "../models/StudentModel";
import StudentService from "../services/StudentService";
import { useQuery } from "react-query";

//https://codesandbox.io/s/example-using-react-query-as-render-props-in-a-class-component-7vjlu?file=/src/App.js:116-216
//https://www.bezkoder.com/react-query-axios-typescript/

export const StudentComponent: React.FC = () => {

  const fetchStudentsAsync = () => async () => {
    const allStudents = StudentService.getAll();
    console.log("#fetchStudentsAsync fetched: ", allStudents.length, " students.");
    return allStudents;
  }

  //const { refetch: getAllStudentsData } =
  //isSuccess: true if the query has received a response with no errors and ready to display data, 
  //data : is the data received from the successful fetch.
  //isError: true if the query has failed with an error. 
  //error property has the error received from the attempted fetch.
  //Cool: refetch: the function to manually refetch the query on-demand. @see #getAllData which we call on btnClick!!
  const { isLoading, isSuccess, isError, data, error, refetch } =
    useQuery<StudentModel[], Error>(
      "query-get-all-students",
      fetchStudentsAsync(),
      {
        enabled: false,
        retry: 2,
        onSuccess: (res) => {
          console.log("Success! isSuccess is ", isSuccess, formatResponse(res)) //setGetResult(fortmatResponse(res));
        },
        onError: (err: any) => {
          console.log("Error :(") //setGetResult(fortmatResponse(err.response?.data || err));
        },
      }
    );

  const getAllData = () => {
    try {
      refetch()
    } catch (err) {
      console.log("Error in refetch : ", err);
    }
  }

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  return (
    <div className="container">
      <>
        <h3>Start a Student Component3</h3>
        <h3>i.e. </h3>
        <button
          className="btn btn-sm btn-primary" onClick={getAllData}>Get All
        </button>
      </>
    </div>
  );
}
//}