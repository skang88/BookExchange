import React from 'react'
import Layout from '../component/Layout'

export default function Home() {
    console.log("Hi from Home page")
  return (
    <Layout>
      
      <div className="container-xl text-center">
        <h1 className="mt-4"> Welcome to Book Hub</h1>
        <div>
          <form className="form-inline">
            <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      
        <div className="row mt-2">
          <div className="col">
            1 of 3
          </div>
          <div className="col-6">
            2 of 3 (wider)
          </div>
          <div className="col">
            3 of 3
          </div>
        </div>
        <div className="row">
          <div className="col">
            1 of 3
          </div>
          <div className="col-5">
            2 of 3 (wider)
          </div>
          <div className="col">
            3 of 3
          </div>
        </div>
      </div>
    </Layout>
  )
}
