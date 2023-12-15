/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useAuth } from '../hooks/useAuth';

function NotFound() {
  const { user } = useAuth();
  return (
    <div>NotFound</div>
  )
}

export default NotFound