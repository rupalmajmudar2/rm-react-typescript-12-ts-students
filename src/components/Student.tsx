import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import StudentModel from "../models/StudentModel";
import StudentService from "../services/StudentService";
import { useQuery, useMutation } from "react-query";

//https://codesandbox.io/s/example-using-react-query-as-render-props-in-a-class-component-7vjlu?file=/src/App.js:116-216
//https://www.bezkoder.com/react-query-axios-typescript/
//if-n-when required: https://stackoverflow.com/questions/62382324/react-typescript-this-jsx-tags-children-prop-expects-a-single-child-of-type

export const StudentComponent: React.FC = () => {
  const [getResult, setResult] = useState<string | null>(null);
  const [getId, setId] = useState<number>(1);
  //const [getStudents, setStudents] = useState<StudentModel[]>([{}]);
  const [getStudentName, setStudentName] = useState("");
  const [getPostResult, setPostResult] = useState<string | null>(null);

  const fetchStudentsAsync = () => async () => {
    const allStudents = StudentService.getAll();
    console.log("#fetchStudentsAsync fetched: ", allStudents.length, " students.");
    return allStudents;
  }
  const clearOutput = () => {
    setResult(null);
  };
  const randomNr = () => {
    return Math.floor((Math.random() * 100) + 1);
  }

  //Cool: refetch: the function to manually refetch the query on-demand. @see #getAllData which we call on btnClick!!
  //https://tanstack.com/query/latest/docs/react/reference/useQuery?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Freference%2FuseQuery
  const { /*isSuccess, isError, data, error,*/ refetch: getAllStudents } =
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

  const { refetch: getStudentById } = useQuery<StudentModel, Error>(
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

  const { mutate: postStudent } = useMutation<any, Error>(
    async () => {
      const rnd = randomNr();
      return await StudentService.createStudent(
        {
          esid: rnd,
          name: getStudentName.concat(String(rnd))
        });
    },
    {
      onSuccess: (res) => {
        console.log(formatResponse(res));
        setPostResult(formatResponse(res));
      },
      onError: (err: any) => {
        console.log(formatResponse(err));
      },
    }
  );

  const { mutate: updateStudent } = useMutation<any, Error>(
    async () => {
      return await StudentService.updateStudent(
        getId,
        getStudentName
      );
    },
    {
      onSuccess: (res) => {
        console.log(formatResponse(res));
      },
      onError: (err: any) => {
        console.log(formatResponse(err));
      },
    }
  );
  //==========================================================
  //Calls from the rendering
  //==========================================================
  const getAllData = () => {
    try {
      console.log("Before #getAllStudents");
      getAllStudents()
      console.log("After #getAllStudents");
    } catch (err) {
      console.log("Error in getAllStudents : ", err);
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

  function postData() {
    try {
      postStudent();
    } catch (err) {
      //setPostResult(fortmatResponse(err));
    }
  }

  function putData() {
    if (getId) {
      try {
        updateStudent();
      } catch (err) {
        //setPutResult(fortmatResponse(err));
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
      <div className="card">
        <div className="card-header">Student Management</div>
        <div className="card-body">

          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All Students
            </button>
            {/*<div>{getResult}</div>*/}
            {/*<h3>All: <>{JSON.stringify(getStudents)}</></h3>*/}
            <input
              type="text"
              maxLength={4}
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
            <button
              className="btn btn-sm btn-warning ml-2"
              onClick={clearOutput}
            >
              Clear
            </button>
          </div>
          {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                value={getStudentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="form-control"
                placeholder="StudentName"
              />
            </div>
            <button className="btn btn-sm btn-primary" onClick={postData}>
              Add Student
            </button>

            {getPostResult && (
              <div className="alert alert-secondary mt-2" role="alert">
                <pre>{getPostResult}</pre>
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              value={getId}
              onChange={(e) => setId(+e.target.value)}
              className="form-control"
              placeholder="Id"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={getStudentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="form-control"
              placeholder="StudentName"
            />
          </div>
          {/*<label className="form-check-label" htmlFor="putPublished">
            Publish
            </label>*/}
          <button className="btn btn-sm btn-primary" onClick={putData}>
            Update Name
          </button>

        </div>
      </div>
    </div >
  );
}