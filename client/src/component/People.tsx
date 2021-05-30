import React, { useState } from 'react';
import {useQuery, gql} from '@apollo/client'
import {Card, Grid, Container, Button, Icon} from 'semantic-ui-react';
import ".././App.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import logo from '.././ori_3501424_df45d13cbadfc482c5422208a63e6f124ccab987_halloween-christmas-star-war-logo-vector-cricut-and-silhouette.jpg'
import App from ".././App"

interface typecheck {
    title: Array<String>
}

const query = gql`
    query GetPerson($person: String!)
    {
        getPerson(person:$person)
        {
            results{
                name,
                height,
                mass,
                gender,
                hair_color,
                skin_color, 
                eye_color,
                birth_year, 
                homeworld{name},
                films{title},
                starships{name},
                species{name},
                vehicles{name}
            }
        }
    }
  `;


function People({state}:{state:any})
{
    const [count, setCount] = useState(state);
    //setCount(state)
    const {loading, error, data} = useQuery(query, {
        variables: { person: count }
      });
    if(loading)
        return <p> Loading ...</p>
    if(error) return <p>Error</p>
        console.log(data)
    return(
        <>
        <Router>
    <Switch>
   <Route exact path="/people">
    <div id="wrapper">
    <Link to={{pathname: "/"}}>
    <Button size='medium' basic inverted color='yellow' id="Back">
      <Icon name='angle double left' />
        Home
    </Button>
    </Link>
    <div id="first"> 
        <div className="App">
            <header className="App-header">
              <img src={logo} alt="Logo" width="60%"/>     
        </header>
        </div>
    </div>
    <div id="second" style={{paddingTop: "60px"}}>
    <Container fluid> 
    {data.getPerson.results.map((person: {
                height: String,  name: String ,  mass: String ,  gender: String,
                hair_color:String,
                skin_color:String, 
                eye_color:String,
                birth_year:String,  
                homeworld: any,
                films: any[], 
                species: any[], 
                starships: any[], 
                vehicles: any[]}) => {  
        return(   
              <Card color='yellow' style={{margin: "auto"}}>
                <Card.Content style={{backgroundColor: "#282c34"}}>
                  <Card.Header style={{backgroundColor:'#282c34', color: "#FFE81F", fontSize: 30}}>
                    {person.name}
                  </Card.Header>
                  <Card.Description style={{backgroundColor:'#282c34', color: "#FFE81F"}}>
                    <br /><br />
                    <strong style={{fontSize:"24px"}}>Personal: </strong><br/><br/>
                    <strong>Height: </strong>
                    <p>{person.height}</p>
                    <strong>Mass: </strong>
                    <p>{person.mass}</p>
                    <strong>Gender: </strong>
                    <p>{person.gender}</p>
                    <strong>Hair Color: </strong>
                    <p>{person.hair_color} </p>
                    <strong>Eye Color: </strong>
                    <p>{person.eye_color} </p>
                    <strong>Skin Color: </strong>
                    <p>{person.skin_color} </p>
                    <strong>Year of Birth: </strong>
                    <p>{person.birth_year} </p><br/><br/>
                    <strong style={{fontSize:"24px"}}>Homeworld: </strong>
                    <p>{person.homeworld.name} </p><br/>
                    <strong style={{fontSize:"24px"}}>Films: </strong><br/><br/>
                    {Object.values(person.films).map((a,i) => <p>{a.title}</p>)}<br/><br/>
                    <strong style={{fontSize:"24px"}}>Vehicles: </strong><br/><br/>
                    {Object.values(person.vehicles).map((a,i) => a!=="" ? <p>{a.name}</p>:<p>n/a</p>)}<br/><br/>
                    <strong style={{fontSize:"24px"}}>Starships: </strong><br/><br/>
                    {Object.values(person.starships).map((a,i) => a !=="" ? <p>{a.name}</p>:<p>n/a</p>)}<br/><br/>
                    <strong style={{fontSize:"24px"}}>Species: </strong><br/><br/>
                    {Object.values(person.species)?.map((a,i) => a !=="" ? <p>{a.name}</p>:<p>n/a</p>)}
                  </Card.Description>
                </Card.Content>
              </Card>
        ) 
        })}        
    </Container>
    <br /><br /><br /><br />    
    </div>  
    </div> 
    </Route>
    <Route path="/">
      <App/>
    </Route>
    </Switch>
    </Router>
</>
    );
}


export default People;