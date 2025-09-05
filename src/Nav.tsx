import { useState, useContext } from 'react';
import {
    IconHome2,
    IconBuilding,
    IconLogout,
    IconSettings,
    IconSwitchHorizontal,
    IconUser,
    IconDeviceDesktopAnalytics,
    IconSun,
    IconMoon
} from '@tabler/icons-react';
import { Code, Group, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Nav.module.css';
import { useColorScheme } from './assets/contexts/ColorSchemeContext';

const data = [
  { link: '/', label: 'Home', icon: IconHome2 },
  { link: '/about-us', label: 'About Us', icon: IconBuilding },
  { link: '', label: 'Account', icon: IconUser },
  { link: '', label: 'Analytics', icon: IconDeviceDesktopAnalytics },
  { link: '', label: 'Settings', icon: IconSettings }
];

export function Nav() {
  const [active, setActive] = useState('Home');
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <h5>Logo Here</h5>
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={toggleColorScheme}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        <ActionIcon
            ml={'sm'} mt={'sm'}
            variant="outline"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            >
            {colorScheme === 'dark' ? (
                <IconMoon style={{ width: 18, height: 18 }} />
            ) : (
                <IconSun style={{ width: 18, height: 18 }} />
            )}
        </ActionIcon>
      </div>
    </nav>
  );
}