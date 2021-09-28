import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button,Modal,Form } from "react-bootstrap/";
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      arr: [],
    show:false ,
   Image:"",
price:"",
name:"",
id:""
};
  }
  componentDidMount = () => {
    // http://localhost:3010/

    axios
      .get("http://localhost:3010/getdata")
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        console.log(this.state.arr);
      })
      .catch(console.log("err in getfruit"));
  };
  updatdata = (event) => {
    event.preventDefault();
    const obj={image:event.target.image.value,
    price:event.target.price.value,
    name:event.target.name.value,


    }

    axios
      .get(`http://localhost:3010/updatdata/${this.state.id}`, obj)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        console.log(this.state.arr);
      })
      .catch(console.log("err in udate"));
  };
  deletedata = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`http://localhost:3010/deletdata/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        console.log(this.state.arr);
      })
      .catch(console.log("err in delete"));
  };
  handleClose=()=>{

this.setState({
          show: false,
        });
  }
  handleShow=(element)=>{this.setState({
    show: true,
    id:element._id,
    name:element.name,
    price:element.price,
    Image:element.Image,
  });}


  render() {
    return <>
    {this.state.arr.map(element=>{
      return(<><Card style={{ width: '18rem' }}>
     
   <Card.Img variant="top" src={`${element.image}`} />
  <Card.Body>
    <Card.Title>name:{element.name}</Card.Title>
     <Card.Text>
       price:{element.price}
     </Card.Text>
    
   </Card.Body>
        <Button on onClick={()=>{this.handleShow(element)}}  variant="primary">update</Button>
      
        <Button onClick={()=>{this.deletedata(element._id)}} variant="primary">delete</Button>
 </Card>
      
      </>)
    })}
 
    
    
<Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Form onSubmit={()=>{this.updatdata()}} >
  
    <Form.Label>name:</Form.Label>
    <Form.Control type="name" name="name" defaultValue={this.state.name}/>
    
    <Form.Label>image:</Form.Label>
    <Form.Control type="text" name="image" defaultValue={this.state.image} />

  
    <Form.Label>price:</Form.Label>
    <Form.Control type="text"   name="price" defaultValue={this.state.price}  />
  

  
</Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" >
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
    
    
  }
}

export default withAuth0(FavFruit);
