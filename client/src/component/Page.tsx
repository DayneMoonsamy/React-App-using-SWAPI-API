import React, { useState } from "react";
import ".././App.css";
import {useQuery, gql} from '@apollo/client'
import {Card, Grid, Pagination} from 'semantic-ui-react';
import logo from '.././ori_3501424_df45d13cbadfc482c5422208a63e6f124ccab987_halloween-christmas-star-war-logo-vector-cricut-and-silhouette.jpg'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import People from "./People"

const query = gql`
query GetPage($input: Int) {
  getPage(id:$input)
  {
    count,
    results
    {
      name, height,
      mass, gender,
      homeworld
      {
        name
      }
    }
  }
}
`;

function Page({state}:{state:any}) {
    console.log(typeof state)
  const [name, setName] = useState<any | null>(null);
  const [page, setPage] = useState(state);
  const { loading, data, error } = useQuery(query, {
    variables: { input: page},
  });
  if(loading)
   return <p> Loading ...</p>
  if(error) return <p>Error</p>
  return (
    <>
   <Router>
    <Switch>
   <Route exact path="/component/Page">
    <div className="App">
      <header className="App-header">
              <img src={logo} alt="Logo" width="30%"/>
              Home
        </header>
    <Grid columns={3} className=" center aligned page grid" >
    {data.getPage.results.map((person: { height: String,  name: String ,  mass: String ,  gender: String, homeworld: any}, key: React.Key | null | undefined) => {
        return(   
          <Grid.Column key={key} className="grid">
            <Link to={{pathname: "/people", state: { name: person.name}}}>
              <Card color='yellow' onClick = {()=>setName(person.name)}>
                <Card.Content style={{backgroundColor: "#282c34"}}>
                  <Card.Header  style={{backgroundColor:'#282c34', color: "#FFE81F", fontSize: 26}}>
                    {person.name}
                  </Card.Header>
                  <br/><br/>
                  <Card.Description style={{backgroundColor:'#282c34', color: "#FFE81F"}}>
                    <strong>Height</strong>
                    <p>{person.height}</p>
                    <strong>Mass:</strong>
                    <p>{person.mass}</p>
                    <strong>Gender:</strong>
                    <p>{person.gender}</p>
                    <strong>Homeworld:</strong>
                    <p>{person.homeworld.name} </p>
                  </Card.Description>
                </Card.Content>
              </Card>
              </Link>
          </Grid.Column>
        )})}        
    </Grid>
    <br/><br/> <br/> <br/>
    <Link to={{pathname: "/component/Page", state: {name: page}}}>
    <Pagination 
      inverted 
      defaultActivePage={page} 
      totalPages={Math.ceil((data.getPage.count)/10)} 
      onPageChange={(event, data) => setPage(data.activePage)}
      />
      </Link>
    <br/> <br/> <br/>
    </div>    
    </Route> 
    <Route path="/people">
      <People state={name}/>
    </Route>
    <Route path="/component/Page">
      <Page state={page}/>
    </Route>  
    </Switch>
    </Router>
   </>
  )
}

export default Page;