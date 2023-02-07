import { useState } from 'react';
import * as React from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinkMaterial from '@mui/material/Link';
import logo from './logo.svg';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import { Routes, Route, Outlet, Link, BrowserRouter as Router, useParams, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edits <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
/*
const isLoggedIn = false;
    const products = [
      { title: 'Cabbage', id: 1, isFruit: false, },
      { title: 'Garlic', id: 2, isFruit: false, },
      { title: 'Apple', id: 3, isFruit: true, },
    ];

    // Component
    function App() {
      const [count, setCount] = useState(0); // convention is [something, setSomething]

      function handleClick() {
        //alert('You clicked the button!');
        setCount(count + 1);
      }

      let content;
      let conditionalContent;
      
      content = products.map(product => 
          <li key={product.id}
              style={{
                color: product.isFruit ? 'magenta': 'darkgreen'
              }}
          >
            {product.title}
          </li>
      );

      if(isLoggedIn) {
        conditionalContent = <div>Hi User!</div>
      } else {
        conditionalContent = <div>Log in</div>
      }

      return (
        <>
          <ul>{content}</ul>
          <div>{conditionalContent}</div>
          <MyButton count={count} onClick={handleClick} />
          <MyButton count={count} onClick={handleClick}  />
        </>
      );
    }

    
    function MyButton({count, onClick}) {
      // Inside component event
      //const [count, setCount] = useState(0); // convention is [something, setSomething]

      //function handleClick() {
        //alert('You clicked the button!');
       // setCount(count + 1);
      //}
      

      return (
        <button onClick={onClick}>
          Click {count} times
        </button>
      );
    }

    */

//function Input
/*
function App() {

  let token;

  function onClick() {
    console.log('Send POST /login (ajax call)');
    let response = 'c74850ae-9e40-11ed-a8fc-0242ac120002';
    token = response;
    document.cookie = "auth="+token; 
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <TextField id="filled-basic" label="Email" variant="filled" />
        <TextField id="filled-basic" label="Password" variant="filled" />
        <Button variant="outlined" color="secondary" onClick={onClick}>Login</Button>
      </Box>
    </Container>
  );

}

export default App;
*/

function App() {

  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/airplane/create" element={<AirplaneForm action="create" />} />
        <Route path="/dashboard/airplane/update" element={<AirplaneForm action="update" />} />
        <Route path="/dashboard/airplane/delete" element={<AirplaneForm action="delete" />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />}>
          <Route path="" element={<PostLists />} />
          <Route path=":slug" element={<Post1 />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

function Home() {
  let navigate = useNavigate();

  let token;

  function onClick() {
    console.log('Send POST /login (ajax call) ...');
    let exampleResponse = 'c74850ae-9e40-11ed-a8fc-0242ac120002';
    token = exampleResponse;
    document.cookie = "auth="+token;
    navigate("/dashboard");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <TextField id="filled-basic" label="Email" variant="filled" />
        <TextField id="filled-basic" type="password" label="Password" variant="filled" />
        <Button variant="outlined" color="secondary" onClick={onClick}>Login</Button>
      </Box>
    </Container>
  );
}


function Dashboard() {
  let navigate = useNavigate();

  function handleCreateAirplane() {    
    navigate("/dashboard/airplane/create");
  }

  return (
    <div>
      <Get url="https://inxelo-interview-project-default-rtdb.europe-west1.firebasedatabase.app/c74850ae-9e40-11ed-a8fc-0242ac120002/flights.json"  /*params={{id: "12345"}}*/>
        {(error, response, isLoading, makeRequest, axios) => {
          if(error) {
            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
          }
          else if(isLoading) {
            return (<div>Loading...</div>)
          }
          else if(response !== null) {
            console.log(response.data);
            return (
              <div>{response.data.message} 
                <Button variant="contained" onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</Button>
                <Button variant="contained" onClick={handleCreateAirplane}>Add new Airplane</Button>
                <Grid objects={response.data}></Grid>
              </div>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </div>
  );
}


function AirplaneForm({action}) {
  let navigate = useNavigate();

  const params = useLocation();
  //console.log(params);

  const [aircraftRegistration, setAircraftRegistration] = useState('');
  const [aircraftRegistrationU, setAircraftRegistrationU] = useState('');
  const [aircraftType, setAircraftType] = useState('');
  const [dateArrival, setDateArrival] = useState('');
  const [dateDeparture, setDateDeparture] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const handleChangeC1 = (event) => {
    setAircraftRegistration(event.target.value);
  };
  const handleChangeC1U = (event) => {
    setAircraftRegistrationU(event.target.value);
  };
  const handleChangeC2 = (event) => {
    setAircraftType(event.target.value);
  };
  const handleChangeC3 = (event) => {
    setDateArrival(event.target.value);
  };
  const handleChangeC4 = (event) => {
    setDateDeparture(event.target.value);
  };
  const handleChangeC5 = (event) => {
    setFlightNumber(event.target.value);
  };

  function handleCreateSubmit() {

    setAircraftRegistration(aircraftRegistration);
    setAircraftType(aircraftType);
    setDateArrival(dateArrival);
    setDateDeparture(dateDeparture);
    setFlightNumber(flightNumber);

    const createData = 
    {
      "aircraftRegistration": aircraftRegistration,
      "aircraftType": aircraftType,
      "dateArrival": dateArrival,
      "dateDeparture": dateDeparture,
      "flightNumber": flightNumber
    };

    fetch("https://inxelo-interview-project-default-rtdb.europe-west1.firebasedatabase.app/c74850ae-9e40-11ed-a8fc-0242ac120002/flights.json",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(createData)
    })
    .then(function(res){ 
      console.log(res); 
      navigate("/dashboard"); 
    })
    .catch(function(res){ console.log(res) });
  }

  function handleUpdateSubmit(uuid) {

    setAircraftRegistrationU(aircraftRegistrationU);
    setAircraftType(aircraftType);
    setDateArrival(dateArrival);
    setDateDeparture(dateDeparture);
    setFlightNumber(flightNumber);    

    console.log("****");
    console.log(aircraftRegistrationU); //  ?? <empty string> ??

    const updateData = 
    {
      "aircraftRegistration": aircraftRegistrationU,
      "aircraftType": aircraftType,
      "dateArrival": dateArrival,
      "dateDeparture": dateDeparture,
      "flightNumber": flightNumber
    };

    fetch("https://inxelo-interview-project-default-rtdb.europe-west1.firebasedatabase.app/c74850ae-9e40-11ed-a8fc-0242ac120002/flight/"+uuid+".json",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(updateData)
    })
    .then(function(res){ 
      console.log(res); 
      navigate("/dashboard"); 
    })
    .catch(function(res){ console.log(res) });
  }

  function handleDeleteSubmit(uuid) {
    fetch("https://inxelo-interview-project-default-rtdb.europe-west1.firebasedatabase.app/c74850ae-9e40-11ed-a8fc-0242ac120002/flight/"+uuid+".json",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
    })
    .then(function(res){ 
      console.log(res); 
      navigate("/dashboard"); 
    })
    .catch(function(res){ console.log(res) });
  }

  if(action === 'create') {
    return (
      <form>
        <div>Create new airplane</div>
        <TextField id="aircraftRegistration" onChange={handleChangeC1} label="aircraftRegistration" variant="outlined" />
        <TextField id="aircraftType" onChange={handleChangeC2} label="aircraftType" variant="outlined" />
        <TextField id="dateArrival" onChange={handleChangeC3} label="dateArrival" variant="outlined" />
        <TextField id="dateDeparture" onChange={handleChangeC4} label="dateDeparture" variant="outlined" />
        <TextField id="flightNumber" onChange={handleChangeC5} label="flightNumber" variant="outlined" />
        <Button onClick={handleCreateSubmit} variant="contained">Save</Button>
        <Button onClick={() => navigate(-1)} variant="contained">Go back</Button>
      </form>
    );
  } else if (action === 'update') {    
    // GET ajax
    let url = "https://inxelo-interview-project-default-rtdb.europe-west1.firebasedatabase.app/c74850ae-9e40-11ed-a8fc-0242ac120002/flights/"+params.state.uuid+".json";
    return <div>
    <Get url={url} >
      {(error, response, isLoading, makeRequest, axios) => {
        if(error) {
          return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
        }
        else if(isLoading) {
          return (<div>Loading...</div>)
        }
        else if(response !== null) {
          // console.log(response.data);
          return (
            <form>
              <div>Update airplane</div>
              <TextField id="aircraftRegistrationU" name="aircraftRegistrationU" defaultValue={response.data.aircraftRegistration} onChange={handleChangeC1U} label="aircraftRegistration" variant="outlined" />
              <TextField id="aircraftType" name="aircraftType" defaultValue={response.data.aircraftType} onChange={handleChangeC2} label="aircraftType" variant="outlined" />
              <TextField id="dateArrival" name="dateArrival" defaultValue={response.data.dateArrival} onChange={handleChangeC3} label="dateArrival" variant="outlined" />
              <TextField id="dateDeparture" name="dateDeparture" defaultValue={response.data.dateDeparture} onChange={handleChangeC4} label="dateDeparture" variant="outlined" />
              <TextField id="flightNumber" name="flightNumber" defaultValue={response.data.flightNumber} onChange={handleChangeC5} label="flightNumber" variant="outlined" />
              <Button onClick={() => handleUpdateSubmit(params.state.uuid)} variant="contained">Update</Button>
              <Button onClick={() => navigate(-1)} variant="contained">Go back</Button>
            </form>
          );
        }
        return (<div>Default message before request is made.</div>)
      }}
    </Get>
  </div>
    
  } else { 
    // action === 'delete'
    return (
      <div>
        <div>Delete this airplane?</div>
        <Button onClick={() => handleDeleteSubmit(params.state.uuid)} variant="contained">Delete</Button>
        <Button onClick={() => navigate(-1)} variant="contained">Go back</Button>
      </div>
    );
  } 
}

function createData(uuid, aircraftRegistration, aircraftType, dateArrival, dateDeparture, flightNumber) {
  return { uuid, aircraftRegistration, aircraftType, dateArrival, dateDeparture, flightNumber };
}

function Grid({objects}) {

  let navigate = useNavigate();

  function handleUpdateAirplane(uuid) {    
    navigate("/dashboard/airplane/update/", {state:{
      uuid
    }});
  }

  function handleDeleteAirplane(uuid) {    
    navigate("/dashboard/airplane/delete/", {state:{
      uuid
    }});
  }

  const rows = [];

  Object.entries(objects).map((object, i) => {    
    rows.push( createData(
      object[0],
      object[1].aircraftRegistration,
      object[1].aircraftType, 
      object[1].dateArrival, 
      object[1].dateDeparture, 
      object[1].flightNumber
      ) 
    );
    return true;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Aircraft registration</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Arrival</TableCell>
            <TableCell align="right">Departure</TableCell>
            <TableCell align="right">Flight number</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={row.uuid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.aircraftRegistration}
              </TableCell>
              <TableCell align="right">{row.aircraftType}</TableCell>
              <TableCell align="right">{row.dateArrival}</TableCell>
              <TableCell align="right">{row.dateDeparture}</TableCell>
              <TableCell align="right">{row.flightNumber}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleUpdateAirplane(row.uuid)} variant="contained">Update</Button>
                <Button onClick={() => handleDeleteAirplane(row.uuid)} variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  /**
  aircraftRegistration: "9A-QTK"
  aircraftType: "A210"​
  dateArrival: "2023–01–02T13:30:00Z"
  dateDeparture: "2023–01–02T08:00:00Z"
  flightNumber: "OU365"
*/
  /*
  return (
    <div>
      <div className="columnNames">
        
      </div>
      <div className="columnRows">
        {Object.entries(objects).map((object, i) => (
          <Row key={i} object={object} />
        ))}
      </div>
    </div>
  );
  */
}

/*
function Row({object}) {
  // console.log(object[1]);
  return (
    <div>
      <div>{object[1].flightNumber}</div>
      <Link to={`/planes/${object[1].flightNumber}`}><h3>{object[1].flightNumber}</h3></Link>
    </div>
  );
}
*/

const BlogPosts = {
  '1': {
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.'
  },
  '2': {
    title: 'Second Blog Post',
    description: 'Hello React Router v6'
  }
};

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      {/* render any matching child */}
      <Outlet />
    </div>
  );
}

function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}><h3>{title}</h3></Link>
        </li>
      ))}
    </ul>
  );
}

function Post1() {
  const { slug } = useParams();
  const post = BlogPosts[slug];
  const { title, description } = post;
  return (
    <div style={{ marginLeft: 1 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}




function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}



export default App;