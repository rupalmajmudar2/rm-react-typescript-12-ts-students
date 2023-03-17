import React, { useState } from "react";
import StudentModel from "../models/StudentModel";
import StudentService from "../services/StudentService";
import { useQuery } from "react-query";

//https://codesandbox.io/s/example-using-react-query-as-render-props-in-a-class-component-7vjlu?file=/src/App.js:116-216
//https://www.bezkoder.com/react-query-axios-typescript/
//if-n-when required: https://stackoverflow.com/questions/62382324/react-typescript-this-jsx-tags-children-prop-expects-a-single-child-of-type

export const StudentComponent: React.FC = () => {
  const [getResult, setResult] = useState<string | null>(null);
  const [getId, setId] = useState<number>(-1);
  //const [getStudents, setStudents] = useState<StudentModel[]>([{}]);

  const fetchStudentsAsync = () => async () => {
    const allStudents = StudentService.getAll();
    console.log("#fetchStudentsAsync fetched: ", allStudents.length, " students.");
    return allStudents;
  }

  //Cool: refetch: the function to manually refetch the query on-demand. @see #getAllData which we call on btnClick!!
  //https://tanstack.com/query/latest/docs/react/reference/useQuery?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Freference%2FuseQuery
  const { /*isSuccess, isError, data, error,*/ refetch } =
    useQuery<StudentModel[], Error>(
      "query-get-all-students",
      fetchStudentsAsync(),
      {
        onSuccess: (res) => {
          console.log("Success! " + formatResponse(res));
          setResult(formatResponse(res));
          //setStudents(res);
        },
        onError: (err) => {
          console.log("Error: " + formatResponse(err));
        },
      }
    );

  const { isLoading: isLoadingTutorial, refetch: getStudentById } = useQuery<StudentModel, Error>(
    "query-get-student-by-esid",
    async () => {
      return await StudentService.findStudentById(getId);
    },
    {
      onSuccess: (res) => {
        setResult(formatResponse(res));
      },
      onError: (err: any) => {
        setResult(formatResponse(err));
      },
    }
  );

  //==========================================================
  //Calls from the rendering
  //==========================================================
  const getAllData = () => {
    try {
      console.log("Before #refetch");
      refetch()
      console.log("After #refetch");
    } catch (err) {
      console.log("Error in refetch : ", err);
    }
  }

  function getDataById() {
    if (getId) {
      try {
        getStudentById();
      } catch (err) {
        setResult(formatResponse(err));
      }
    }
  }

  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  //==========================================================
  //Rendering
  //==========================================================
  return (
    <div className="container">
      <>
        <h3>Student Component</h3>
        {<h3>ResultStr: <>{getResult}</></h3>}
        {/*<h3>All: <>{JSON.stringify(getStudents)}</></h3>*/}
        <button
          className="btn btn-sm btn-primary" onClick={getAllData}>Get All Students
        </button>

        <input
          type="text"
          value={getId}
          onChange={(e) => setId(+e.target.value)}
          className="form-control ml-2"
          placeholder="Id"
        />
        <div className="input-group-append">
          <button className="btn btn-sm btn-primary" onClick={getDataById}>
            Get by Id
          </button>
        </div>

      </>
    </div>
  );
}