import styles from './Nav.module.scss'
import LightSwitch from '../LightSwitch/LightSwitch'
import NavItem, { NavItemType } from './NavItem'
import Link from 'next/link'

const NAV_ITEMS: NavItemType[] = [
  // {
  //   id: 'viz',
  //   title: 'Visualizations',
  //   link: '/visualizations',
  //   Icon: Image,
  // },
  // {
  //   id: 'bio',
  //   title: 'Bio',
  //   link: '/bio',
  //   Icon: User,
  // },
]

interface Props {
  hideMenu?: boolean
}

const Nav: React.FC<Props> = ({ hideMenu = false }) => {
  return (
    <nav id={styles.Nav}>
      <Link href="/">
        <div id={styles.logo}>
          <img src="https://rukminim1.flixcart.com/image/850/1000/xif0q/key-chain/8/c/t/bharadwaj-name-black-keychain-sy-gifts-1-original-imagpn4p6wmezv9w.jpeg?q=20" alt="logo" />
        </div>
      </Link>

      <ul id={styles.navItems}>
        {!hideMenu
          ? NAV_ITEMS.map(item => <NavItem key={item.id} {...item} />)
          : null}
      </ul>

      <LightSwitch />
    </nav>
  )
}

export default Nav
