import styles from './Social.module.scss'
import { GitHub, Linkedin } from 'react-feather'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

type Props = {
  showLabels?: boolean
}

const SOCIALS = [
  {
    label: 'Github',
    link: 'https://github.com/Manu577228',
    Icon: GitHub,
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/manu-bharadwaj-3507a345/',
    Icon: Linkedin,
  },
] as const

const Social: React.FC<Props> = ({ showLabels = true }) => {
  return (
    <div className={`${styles.Social} sans`}>
      {SOCIALS.map(({ label, link, Icon }) => (
        <a
          key={link}
          className={styles.social}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PrimaryButton>
            <Icon />
            {showLabels && <span>{label}</span>}
          </PrimaryButton>
        </a>
      ))}
    </div>
  )
}

export default Social
