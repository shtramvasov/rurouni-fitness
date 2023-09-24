import styles from './layout.module.scss'
import Header from './Header/Header'

function Layout({ children }) {
  return (
    <main className={styles.layout}>
        <Header />
        <section className={styles.wrapper}>{ children }</section>
    </main>
  )
}

export default Layout