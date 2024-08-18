import React from 'react'
import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (<>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Page Not Found</h5>
              <p className="card-text">The page you are looking for does not exist.</p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
    

  )
}
