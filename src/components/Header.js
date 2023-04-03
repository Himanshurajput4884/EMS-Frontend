import React, { useContext, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate , NavLink } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import { ButtonBase } from '@mui/material';
const URL="https://ems-backend-duin.onrender.com/";


const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch(`${URL}logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
        } else {
            console.log("error");
        }
    }

    const goError = () => {
        history("*")
    }
    console.log(logindata.validUserOne);
    return (
        <>
            <header>
                <nav>
                    
                <NavLink to="/" className="name"><h1>Employee Management</h1></NavLink>
                {/* { logindata.validUserOne ? 
                <NavLink to="/add/employee" style={{"textDecorationLine":"none"}}>Add Employee</NavLink> : 
                <NavLink to="/login" style={{"text-decoration-line":"none"}}>Add Employee</NavLink>} */}
                    <div className="avtar">
                        {
                            logindata.validUserOne ? 
                            <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.validUserOne.name[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ background: "blue" }} onClick={handleClick} />
                        }

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.validUserOne ? (
                                <>
                                    <MenuItem onClick={() => {
                                        handleClose()
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem><NavLink to="/login" style={{"color":"black", "text-decoration-line":"none"}}>Login</NavLink></MenuItem>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                        }

                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header