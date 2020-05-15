import React from 'react';
import { Link } from 'react-router-dom';

const SignedUpLinks = () => {
    return (
        <React.Fragment>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign up</Link>
        </React.Fragment>
    );
};

export default SignedUpLinks;