import React, { Fragment } from 'react';
import { Row } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link, animateScroll as scroll } from "react-scroll";


const Tags = (props) => {
    const {service}=props
    const types=service?service.type:""
    return (
        <Fragment>
            {
                Object.keys(types).map(key=>{
                    return (<Link
                    activeClass="active"
                    to={`${key}-scroll`}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration= {500}
                ><Row>{types[key].name}</Row></Link>)
                    
                })
            }

        </Fragment>
        
    );
};

export default Tags;