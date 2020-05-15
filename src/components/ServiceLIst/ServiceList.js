import React from 'react';
import Service from './Service/Service';
import { Container } from 'react-bootstrap';

const ServiceList = (props) => {
    const {list,clicked}=props
    return (
        <Container fluid>
            {
                list?Object.keys(list).map((key,index)=><Service clicked={clicked} id={key} tag={list[key] && list[key].tag} key={key} name={list[key] && list[key].name}/>)
                :"Loading..."
            }
        </Container>
    );
};

export default ServiceList;