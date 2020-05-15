import React, { Fragment } from 'react';
import Worker from './Worker/Worker';

const Workers = (props) => {
    const {workers,city,service}=props
    console.log(workers)
    return (
        <Fragment>
            {workers?Object.keys(workers).map(key=>{
                
                if(city===workers[key].city && service.name===workers[key].service){
                    return (
                        <Fragment>
                            {console.log(workers[key].city,service)}
                            <Worker details={workers[key]}/>

                        </Fragment>
                        
                    )
                }
                return null;
            }):<p>No guys</p>}

        </Fragment>
    );
};

export default Workers;