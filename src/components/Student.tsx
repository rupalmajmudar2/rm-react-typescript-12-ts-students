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
  //refetch: getAllStudents -> "Assigns" the refetch function to getAllStudents
  const { /*isSuccess: isOk, isError, data, error,*/ refetch: getAllStudents } =
    useQuery<StudentModel[], Error>(
      "query-get-all-students",
      fetchStudentsAsync(),
      {
        onSuccess: (res) => {
          console.log("Success! ");// + formatResponse(res));
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
        setResult(formatResponse(res));
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
      console.log("Before #getAllDataStudents val is ", getAllStudents);
      getAllStudents()
      console.log("After #getAllDataStudents");
    } catch (err) {
      console.log("Error in getAllDataStudents : ", err);
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

        {/*#1 #GetAllStudents*/}
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>
              Get All Students
            </button>
          </div>
        </div>

        {/*#2 #GetStudentById*/}
        <div className="card-body">
          <div className="form-group">
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
          </div>
        </div>

        {/*#3 #CreateStudent*/}
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
        </div>

        {/*#4 #UpdateStudent*/}
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              value={getId}
              onChange={(e) => setId(+e.target.value)}
              className="form-control"
              placeholder="Id"
            />
            <input
              type="text"
              value={getStudentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="form-control"
              placeholder="StudentName"
            />
            <button className="btn btn-sm btn-primary" onClick={putData}>
              Update Name
            </button>
          </div>
        </div>

        {/*#5 #Clear*/}
        <div className="card-body">
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearOutput}
          >
            Clear
          </button>
        </div>

        {/*#5 #GetResult*/}
        <div className="card-body">
          <div>
            {getResult && (
              <div className="alert alert-secondary mt-2" role="alert">
                <pre>{getResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}