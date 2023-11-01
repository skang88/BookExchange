import React from 'react'
import Layout from '../component/Layout'

export default function Home() {
    console.log("Hi from Home page")
  return (
    <Layout>
      <div className="container-xl text-center">
        <div className="row">
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
