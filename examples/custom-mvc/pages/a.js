import React from 'react'

export const getServerSideProps = ({ res }) => {
  return { props: res.viewdata || {} }
}

export default ({ msg }) => <h3>{msg}</h3>
