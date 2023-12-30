import styles from './LandingPage.module.scss'
import Nav from '../Nav/Nav'
import { useMouse } from '../../utils/useMouse'
import { useEffect, useState } from 'react'

const titles = [
  'Software Engineer',
  <span>
    MERN | MEAN & <br />
    Springboot
  </span>,
]

const LandingPage: React.FC = () => {
  const { dx, dy } = useMouse()
  const [activeTitle, setActiveTitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitle(title => (title + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id={styles.LandingPage}>
      <Nav />
      <h1
        style={{
          transform: `translate(
            ${dx / -20}px,
            ${dy / -20}px
            )`,
        }}
        id={styles['name-hero']}
      >
        Manu
        <br />
        Bharadwaj
      </h1>

      <p className={styles.titles}>
        {titles.map((title, i) => (
          <code
            className={activeTitle === i ? styles.active : ''}
            key={'title-' + i}
          >
            {title}
          </code>
        ))}
      </p>

      <h4
        style={{
          transform: `translate(0, ${dy / 40}px)`,
        }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }}
        id={styles['imadethese']}
      >
        My Recent Mini Projects
      </h4>
    </div>
  )
}

export default LandingPage
