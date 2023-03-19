import axios from "axios";
import StudentModel from "../models/StudentModel";

//https://www.bezkoder.com/react-query-axios-typescript/

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

const studentData: StudentModel[] = [];
let s1: StudentModel = { esid: 1, name: "S1" };
let s2: StudentModel = { esid: 2, name: "S2" };
let s3: StudentModel = { esid: 3, name: "S3" };
studentData.push(s1);
studentData.push(s2);
studentData.push(s3);
let sNull: StudentModel = { esid: -1, name: "Anon" };

//function getAll(): StudentModel[] {
const getAll = () => {
  return studentData;
};

const findStudentById = (esid: number) => {
  const found: StudentModel[] = getAll().filter(
    (student) => student.esid === esid
  );

  if (found.length === 0 || found.length > 1) return sNull;
  return found[0];
};

const createStudent = async ({ esid, name }: StudentModel) => {
  //const response = await apiClient.post<any>("/tutorials", { title, description });
  const newStudent = { esid: esid, name: name };
  studentData.push(newStudent);
  return newStudent;
};

const updateStudent = async (id: number, newname: string) => {
  const studentToUpdate = findStudentById(id);
  studentToUpdate.name = newname;
  return studentToUpdate;
};

const StudentService = {
  getAll,
  findStudentById,
  createStudent,
  updateStudent,
};

export default StudentService;
