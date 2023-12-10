import React, { FC } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

interface MidRouteProps {
    children : React.ReactElement;
}
const MidRoute : FC<MidRouteProps> = ({ children }) => {
    const { user } = useAuth();
    console.log(user);
    if ( user ) {
        return (
            <Navigate to="/Main" replace ={true} />
          )
    }
    return children;
}

export default MidRoute