import React from 'react'
import styles from './styles.scss'

function Layout (props) {
  return (
    <div className={styles.root}>
      <header>
        <div className={styles.header}>
          <div className={styles.brand}>
            <a href='/'>Menubar</a>
          </div>
          <nav className={styles.nav}>
            <ul>
              <li>
                <a href='/about'>About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={styles.content}>
        {props.children}
      </main>
      <footer>
        
      </footer>
    </div>
  )
}

export default Layout
