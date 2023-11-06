import React from 'react'
import Layout from '../component/Layout'
import LoginForm from '../component/LoginForm';
import AddbookForm from '../component/AddbookForm';

export default function Addbook() {

    const token = localStorage.getItem('token');

  return (
    <div>
    <Layout>
        { token ? (
          <AddbookForm />
          ) : (
          <LoginForm className='mt-3 mb-3'/>
          )
        }
    </Layout>
    </div>
  )
}
