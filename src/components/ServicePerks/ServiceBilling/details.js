import React, { Fragment } from 'react';
import { Button, Row } from 'react-bootstrap';

const Details = (props) => {
    const {service,sub,close}=props
    let view;
    const s=sub.split("-")
    
    if(sub){
        const newSub=service && service.type[s[1]].subtype[s[0]]
    console.log(newSub)
        view=(
            <Fragment>
            <Button onClick={close}>Close</Button>
            
                <Row>
                    <h4>Why {newSub.name} is Safe</h4>
                        <ul>
                            {
                                newSub.why_safe.split(" , ").map(e=>{
                                    return <li>{e}</li>
                                })
                            }
                        </ul>
                </Row>
                <Row>
                    <h4>Brands used</h4>
                        <ul>
                            {
                                newSub.brands.split(" , ").map(e=>{
                                    return <li>{e}</li>
                                })
                            }
                        </ul>
                </Row>
                <Row>
                    <h4>What's included</h4>
                        <ul>
                            {
                                newSub.whats_included.split(" , ").map(e=>{
                                    return <li>{e}</li>
                                })
                            }
                        </ul>
                </Row>
                <Row>
                    <h4>We recommend</h4>
                        <ul>
                            {
                                newSub.recommend.split(" , ").map(e=>{
                                    return <li>{e}</li>
                                })
                            }
                        </ul>
                </Row>

            </Fragment>
            
        )
    }
    return (
        <Fragment>
            {view}
        </Fragment>
            
        
    );
};

export default Details;