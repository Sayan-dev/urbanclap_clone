import React from 'react';
import { Card } from 'react-bootstrap';

const Service = (props) => {
    return (
        <div>
            <Card>
                <Card.Title>
                    {/* <h3></h3> */}
                </Card.Title>
            </Card>
            <p style={{textAlign:"center"}}>{props.details.name}</p>
        </div>
    );
};

export default Service;