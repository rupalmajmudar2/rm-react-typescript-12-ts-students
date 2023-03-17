import axios from "axios";
import { useQuery } from "react-query";

export default interface StudentModel {
  esid?: number;
  name?: string;
}

export function StudentModelFetcher() {
  ////status contains where we are in the fetching process ("idle" or "error" or "loading" or "success").
  /*const { status, error, data } = useQuery<StudentModel, Error>(
    ["student", { esid: 11 }], // query key
    getStudent // fetching function
  );*/
}

type Params = {
  queryKey: [string, { id: number }];
};
function getStudent(params: Params) {
  //const [, { esid }] = params.queryKey;
  /*const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    if (!response.ok) {
      throw new Error("Problem fetching data");
    }
    const character = await response.json();
    assertIsCharacter(character);
  
    return character;*/
  return { esid: 11, name: "Rupal" };
}
