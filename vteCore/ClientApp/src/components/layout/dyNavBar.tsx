import { useHover, useViewportSize } from '@mantine/hooks'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useMenuLinkStyle from '@/constants/styles/mnMenuLink'
import {
  Box,
  Center,
  HoverCard,
  Group,
  Text,
  Anchor,
  Divider,
  SimpleGrid,
  UnstyledButton,
  ThemeIcon,
  rem,
  clsx
} from '@mantine/core'
import {
  IconChevronDown,
  IconCode,
  IconCoin,
  IconBook,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
} from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import { generatePath } from 'react-router'


export const DyNavBar = () => {
  const { classes: menuLinkStyle, theme } = useMenuLinkStyle()
  const [openHovered, setOpenHover] = useState(false)
  const [drawerTop, setDrawerTop] = useState<number>(0)
  const { width} = useViewportSize()
  const headRef = useRef<HTMLDivElement | null>(null)  

  useEffect(()=> {
    console.log(`rerender happens`)


  },[width])

  const openclosehover = useCallback(() => {
    setOpenHover(!openHovered)
  }, [openHovered, setOpenHover])
  const mockdata = [
    {
      icon: IconCode,
      title: 'Open source',
      description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
      icon: IconCoin,
      title: 'Free for everyone',
      description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
      icon: IconBook,
      title: 'Documentation',
      description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
      icon: IconFingerprint,
      title: 'Security',
      description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
      icon: IconChartPie3,
      title: 'Analytics',
      description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
      icon: IconNotification,
      title: 'Notifications',
      description: 'Combusken battles with the intensely hot flames it spews',
    },
  ]

  return (
    <div className="navbar bg-base-100" data-theme="cyberpunk" ref={headRef}>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="underline-flash">
            <NavLink key={'home'} to={generatePath('/home')} className={({isActive})=> isActive ? 'is-active': ''} >Home</NavLink>
          </li>
          <li className="underline-flash">
            <HoverCard width={600} position="bottom" radius={'md'} shadow="md" withinPortal onOpen={openclosehover} onClose={openclosehover}>
              <HoverCard.Target>
                <a href="#" className={menuLinkStyle.menulink}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} className={clsx('arrow',openHovered ? 'active' : '')} />
                  </Center>
                </a>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>
                <Divider my="sm" mx="-md" color={theme.colorScheme === 'dark' ? 'brand.5' : 'brand.1'} />
                <SimpleGrid cols={2} spacing={0}>
                  {mockdata.map((item, index) => (
                    <UnstyledButton className={menuLinkStyle.childLink} key={`${item.title}-${index}`}>
                      <Group noWrap align="flex-start">
                        <ThemeIcon size={34} variant="default" radius="md">
                          <item.icon size={rem(22)} color={theme.fn.primaryColor()}  />
                        </ThemeIcon>
                        <div>
                          <Text size="sm" fw={500}>
                            {item.title}
                          </Text>
                          <Text size="xs" color="dimmed">
                            {item.description}
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  ))}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
          </li>
          <li className="underline-flash">
            <NavLink key={'login'} to={generatePath('/login')} className={({isActive})=> isActive ? 'is-active': ''} >Login</NavLink>
          </li>          
        </ul>
      </div>
    </div>
  )
}
