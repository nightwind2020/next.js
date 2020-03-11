import React from 'react'

export const getStaticProps = ({ res }) => {
  return { props: { msg: 'hi' } }
}

export default ({ msg }) => <h3>{msg}</h3>
