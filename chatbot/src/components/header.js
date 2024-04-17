import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
    render() {
        return (
            <div style={{
                backgroundColor: "skyblue",
                width: "100%",
                height: "6%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",  // Add padding for better spacing
            }}>
                <h1 style={{ margin: "0" }}>My Health Bot</h1>
                <Link to="/" style={{ textDecoration: "none", color: "black", display: "flex", alignItems: "center" }}>
                    Logout
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginLeft: "5px" }} />
                </Link>
            </div>
        )
    }
}

export default Header;
