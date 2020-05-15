import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

const Worker = (props) => {
    const {details}=props;
    console.log(details);
    return (
        <Fragment>
            <Row>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        <p>{`${details.firstName} ${details.lastName}`}</p>
                    </Col>
                </Row>
            </Row>
        </Fragment>
    );
};

export default Worker;