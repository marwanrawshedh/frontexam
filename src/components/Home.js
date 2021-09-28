import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Card, Button } from "react-bootstrap/";
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { arr: [],
    test:"wwwwww" };
  }
  componentDidMount = () => {
    // http://localhost:3010/

    axios
      .get("http://localhost:3010/get")
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        // console.log(this.);
      })
      .catch(console.log("err in getfruit"));
  };
  postdata = (obj) => {
    const { user } = this.props.auth0;
    const email = user.email;
    

    axios
      .post(`http://localhost:3010/postdata?email=${email}`, obj)
      .then((result) => {
        
      })
      .catch(console.log("err in post"));
  };
  render() {
    // {console.log(this.state.arr)}
    
    return (
      <>
{/* {this.state.test} */}
        { this.state.arr.map((element) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={`${element.image}`} />
                <Card.Body>
                  <Card.Title>name:{element.name}</Card.Title>
                  <Card.Text>price:{element.price}</Card.Text>
                  <Button onClick={()=>{this.postdata(element)}} variant="primary">add to fav</Button>
                  {console.log(element)}
                </Card.Body>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default withAuth0(Home);
