import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import CreateIcon from "@mui/icons-material/Create";
import "./empTable.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import { NavLink } from "react-router-dom";
import "./leaflet.css";
const URL="https://employee-management-backend-tau.vercel.app/";


function MyVerticallyCenteredModal(props) {
  const data = props.data;

  const city = data.city;
  const center = [77.2167, 28.6667];
  const position = [51.505, -0.09];

  const [ latti, setLatti] = useState(77.2167);
  const [ longi, setLongi ] = useState(28.6667);
  const API_KEY = "0835524e9286c4de06a03df77d17bd17";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


  useEffect(()=>{
    const getLocation = async ()=>{
      const data = await fetch(url);
      const res = await data.json();
      console.log(res);
      setLatti(res.coord.lat);
      setLongi(res.coord.lon);
    }
    getLocation();
  },[]);
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ display: "flex", "justify-content": "space-evenly" }}
      >
        <Box>
          <Box>
            <h6>Employee Id: {data.empId} </h6>
          </Box>
          <Box>
            <h6>Age: {data.age} </h6>
          </Box>
          <Box>
            <h6>Department: {data.department} </h6>
          </Box>
        </Box>
        <Box>
          <Box>
            <h6>
              Address: {data.locality}, {data.city}{" "}
            </h6>
          </Box>
          <Box>
            <h6>Status: {data.status} </h6>
          </Box>
          <Box>
            <h6>Added By: {data.createdBy} </h6>
          </Box>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <MapContainer center={[latti, longi]} zoom={10}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=eV6Bvdm4v2RVbhAlKDHR"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

        <Marker
          position={[latti, longi]}
        />

    </MapContainer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TableRow({ data }) {
  const id = data._id;
  const url = `update/${id}`;
  const [modalShow, setModalShow] = useState(false);
  console.log(modalShow);
  const handleShow = () => setModalShow(true);
  return (
    <tbody
      style={{ cursor: "pointer" }}
      onClick={() => (modalShow ? null : handleShow())}
    >
      <tr>
        <th>{data.empId}</th>
        <th>{data.name}</th>
        <th>{data.department}</th>
        <th>{data.status}</th>
        <th>
          <NavLink to={url}><CreateIcon /></NavLink>
        </th>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={data}
        />
      </tr>
    </tbody>
  );
}

export default TableRow;
