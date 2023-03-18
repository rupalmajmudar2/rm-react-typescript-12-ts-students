import axios from "axios";
import StudentModel from "../models/StudentModel";

//https://www.bezkoder.com/react-query-axios-typescript/

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

let s1: StudentModel = { esid: 1, name: "S1" };
let s2: StudentModel = { esid: 2, name: "S2" };
let s3: StudentModel = { esid: 3, name: "S3" };
let sNull: StudentModel = { esid: -1, name: "Anon" };

//function getAll(): StudentModel[] {
const getAll = () => {
  let students: StudentModel[] = [];
  students.push(s1);
  students.push(s2);
  students.push(s3);

  return students;
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
  return { esid: esid, name: name };
};

const updateStudent = async (id: any, { name }: StudentModel) => {
  const studentToUpdate = findStudentById(id);
  studentToUpdate.name = name;
  return studentToUpdate;
};

const StudentService = {
  getAll,
  findStudentById,
  createStudent,
  updateStudent,
};

export default StudentService;
/*const findById = async (id: any) => {
  const response = await apiClient.get<StudentModel>(`/tutorials/${id}`);
  return response.data;
};

const findByTitle = async (title: string) => {
  const response = await apiClient.get<StudentModel[]>(
    `/tutorials?title=${title}`
  );
  return response.data;
};

const create = async ({ title, description }: StudentModel) => {
  const response = await apiClient.post<any>("/tutorials", {
    title,
    description,
  });
  return response.data;
};

const update = async (
  id: any,
  { title, description, published }: StudentModel
) => {
  const response = await apiClient.put<any>(`/tutorials/${id}`, {
    title,
    description,
    published,
  });
  return response.data;
};

const deleteById = async (id: any) => {
  const response = await apiClient.delete<any>(`/tutorials/${id}`);
  return response.data;
};

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/tutorials");
  return response.data;
};

const TutorialService = {
  findAll,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll,
};*/
