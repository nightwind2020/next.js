import React from 'react'
import Link from 'next/link'

export default () => (
  <Link href="/a" as="/a">
    <a>a</a>
  </Link>
)
