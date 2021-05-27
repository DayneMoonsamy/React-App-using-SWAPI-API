import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {useQuery, gql} from '@apollo/client'

const query = gql`{
  getPerson(person:"Anakin Skywalker")
  {
    results
    {
      name,
      height,
			mass,
      gender,
      homeworld
      {
        name
      }
    }
  }
}
`;

function App() {
  //const [data, setData] = React.useState(null);

  const {loading, error, data} = useQuery(query);
  if(loading)
    return <p> Loading ...</p>
  if(error) return <p>Error</p>
  console.log(data)

  return (
    <>
    <div className="App">
      <header className="App-header">
      STAR WARS
      </header>
    </div>
   </>
  )
}

export default App;