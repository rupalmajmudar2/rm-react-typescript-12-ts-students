import React, { ReactNode, useState } from "react";
import StudentModel from "../models/StudentModel";
import StudentService from "../services/StudentService";
import { useQuery } from "react-query";

//https://codesandbox.io/s/example-using-react-query-as-render-props-in-a-class-component-7vjlu?file=/src/App.js:116-216
//https://www.bezkoder.com/react-query-axios-typescript/
//https://stackoverflow.com/questions/62382324/react-typescript-this-jsx-tags-children-prop-expects-a-single-child-of-type

//type PropsWithChildren<P> = P & { children?: ReactNode }
//type FCWithProps<T = {}> = React.FC<React.PropsWithChildren<T>>

export const StudentComponent: /*FCWithProps*/ React.FC = () => {
  const [getResult, setResult] = useState<string | null>(null);
  const [getStudents, setStudents] = useState<StudentModel[]>([{}]); //{ esid: -1, name: "Anon" } 

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
  //https://tanstack.com/query/latest/docs/react/reference/useQuery?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Freference%2FuseQuery
  const { /*isSuccess, isError, data, error,*/ refetch } =
    useQuery<StudentModel[], Error>(
      "query-get-all-students",
      fetchStudentsAsync(),
      {
        enabled: false,
        retry: 2,
        onSuccess: (res) => {
          console.log("Success! " + formatResponse(res));
          setResult(formatResponse(res));
          setStudents(res);
        },
        onError: (err) => {
          console.log("Error: " + formatResponse(err));
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
        <h3>ResultStr: <>{getResult}</></h3>
        <h3>ResultStudents: <>{JSON.stringify(getStudents)}</></h3>
        <button
          className="btn btn-sm btn-primary" onClick={getAllData}>Get All
        </button>
      </>
    </div>
  );
}
//}