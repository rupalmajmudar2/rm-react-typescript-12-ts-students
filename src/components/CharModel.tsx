import { useQuery } from "react-query";

type Character = {
  name: string;
};

function assertIsCharacter(character: any): asserts character is Character {
  if (!("name" in character)) {
    throw new Error("Not character");
  }
}

type Params = {
  queryKey: [string, { id: number }];
};
async function getCharacter(params: Params) {
  const [, { id }] = params.queryKey;
  const response = await fetch(`https://swapi.dev/api/people/${id}/`);
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const character = await response.json();
  assertIsCharacter(character);

  return character;
}

export default function CharApp() {
  const { status, error, data } = useQuery<Character, Error>(
    ["character", { id: 1 }],
    //getCharacter(Params)
  );

  if (status === "loading") {
    return <div>...NotYet...</div>;
  }
  if (status === "error") {
    return <div>Err : {error.message}</div>;
  }

  return data ? <h3>{data.name}</h3> : null;
}
