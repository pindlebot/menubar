import React from 'react'
import styles from './styles.scss'

function Breadcrumbs (props) {
  const { items } = props
  return (
    <ul className={styles.breadcrumb}>
      {items.map(({ path, name }) => {
        return (
          <li key={name} className={styles.breadcrumbItem}>
            <a key={`a_${name}`} href={path}>{name}</a>
          </li>
        )
      })}
    </ul>
  )
}

export default Breadcrumbs
