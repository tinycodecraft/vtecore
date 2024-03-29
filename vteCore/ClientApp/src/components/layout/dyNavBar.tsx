import { useHover, useResizeObserver, useViewportSize } from '@mantine/hooks'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import useMenuLinkStyle from '@/constants/styles/mnMenuLink'
import { LanguageControl } from '@/components/layout/mnLangBtn'
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
  clsx,
  Menu,
} from '@mantine/core'
import {
  IconChevronDown,
  IconCode,
  IconCoin,
  IconBook,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
  IconHome,
  IconLock,
  IconCloudCog,
  IconLogout,
  IconCloudFog,
  IconUser,
  IconPasswordUser,
  IconList,
  IconSwitch3,
} from '@tabler/icons-react'
import { NavLink, createSearchParams } from 'react-router-dom'
import { generatePath, useNavigate } from 'react-router'
import routes from '@/constants/routes/config'
import { HubInit, HubState, MenuPositionEnum } from '@/constants/types'
import { useAppSelector, useWindowSize } from '@/hooks'
import { clsxm } from '@/utils/methods'
import { DyHamburger } from '@/components/dyHamburger'
import LayoutContext from '@/components/context/CtxForLayout'

export const DyNavBar = () => {
  const { classes: menuLinkStyle, theme } = useMenuLinkStyle()

  const windowSize = useWindowSize()
  const [navRef, navRect] = useResizeObserver()
  const [midRef, midRect] = useResizeObserver()
  const { isfullwidth, setfullwidth, setNavOpen, isNavOpen } = useContext(LayoutContext)

  const { token, controlAdminEnabled, userName } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const icons = [IconHome, IconLock, IconCloudFog, IconLogout, IconSwitch3, IconList]
  const navigate = useNavigate()

  useEffect(() => {
    if (windowSize.winWidth) {
      console.log(`the center menu width `, navRect.width,midRect.width)
      setfullwidth && setfullwidth((midRect.width > (navRect.width + 50)) || (navRect.width > 250))
    }
  }, [windowSize, navRect, midRect])
  useEffect(() => {
    if (isfullwidth && setNavOpen) {
      console.log(`the full width `,isfullwidth)
      setNavOpen(false)
    }
  }, [isfullwidth])

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
    <div className="navbar bg-base-100" data-theme="nord">
      <div className="flex-none">
        <a className="btn btn-ghost text-2xl font-blck pointer-events-none" >
          Ray Studio
        </a>
        {!isfullwidth && (
            <div className={clsxm('tham tham-e-spin tham-w-6 -mt-1',isNavOpen ? 'tham-active': '')} onClick={()=> setNavOpen && setNavOpen(value=> !value)}>
              <div className='tham-box'>
                <div className='tham-inner' />
              </div>
            </div>

          )}        
      </div>
      <div className="flex-grow justify-center" ref={midRef}>
        {isfullwidth && (
          <ul className="menu menu-horizontal px-1" ref={navRef}>
            {routes
              .filter((e) => e.position === MenuPositionEnum.center && (!e.locked || token))
              .map((route, index) => {
                return (
                  <li
                    className={clsxm(`${menuLinkStyle.simplelink}`, 'underline-flash', 'font-quan', 'text-lg')}
                    key={`${route.name}-${index}`}
                  >
                    <NavLink key={route.name} to={generatePath(route.path, route.params)}>
                      {React.createElement(icons[route.iconIndex ?? 0], { className: 'h-[18px] w-[18px] inline' })}
                      {route.name}
                    </NavLink>
                  </li>
                )
              })}

            <li className="underline-flash">
              <HoverCard
                width={600}
                position="bottom"
                radius={'md'}
                shadow="md"
                withinPortal
                // setstate problem
                // onOpen={openclose}
                // onClose={openclose}
              >
                <HoverCard.Target>
                  <a className={clsxm(menuLinkStyle.menulink, 'font-quan', 'text-lg')}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} className="arrow" />
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
                            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              {item.title}
                            </Text>
                            <Text size="xs" color="yellow.0" className="font-gabr">
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
          </ul>
        )}
      </div>
      <div className="flex-none">
        <LanguageControl className="mr-2" />
        <ul className="menu menu-horizontal px-1">
          <li className="underline-flash">
            {token && (
              <Menu
                shadow="md"
                width={200}
                position="bottom-end"
                withinPortal
                trigger="hover"
                styles={(theme) => ({
                  item: {
                    '&:hover': {
                      color: theme.colorScheme == 'dark' ? `${theme.colors.sharp[5]}` : `${theme.colors.sharp[8]}`,
                    },
                    '&:hover a': {
                      color: theme.colorScheme == 'dark' ? `${theme.colors.sharp[5]}` : `${theme.colors.sharp[8]}`,
                    },
                  },
                })}
              >
                <Menu.Target>
                  <a className={menuLinkStyle.menulink}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        <IconUser className="h-[18px] w-[18px] inline text-lg font-quan" /> {userName}
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} className="arrow" />
                    </Center>
                  </a>
                </Menu.Target>
                <Menu.Dropdown className={clsxm('px-1 mx-1 w-full', menuLinkStyle.sublinkonly)}>
                  {controlAdminEnabled && (
                    <Menu.Item
                      icon={React.createElement(icons[5], { className: 'h-[18px] w-[18px] inline' })}
                      className="text-gray-50"
                      onClick={() => navigate('/userlist')}
                    >
                      <NavLink
                        key={'userlist'}
                        to={{
                          pathname: '/userlist',
                          // or using createsearchparams if not using state
                          // , search: createSearchParams({mode: 'exit'}).toString()
                        }}
                        className={clsxm('text-gray-50')}
                      >
                        User List
                      </NavLink>
                    </Menu.Item>
                  )}
                  <Menu.Item
                    icon={React.createElement(icons[4], { className: 'h-[18px] w-[18px] inline' })}
                    className="text-gray-50"
                    onClick={() => navigate('/chgpsswd')}
                  >
                    <NavLink
                      key={'chgpsswd'}
                      to={{
                        pathname: '/chgpsswd',
                        // or using createsearchparams if not using state
                        // , search: createSearchParams({mode: 'exit'}).toString()
                      }}
                      className={clsxm('text-gray-50')}
                    >
                      Change Password
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item
                    icon={React.createElement(icons[3], { className: 'h-[18px] w-[18px] inline' })}
                    className="text-gray-50"
                    onClick={() => navigate('/logout', { state: { mode: 'exit' } })}
                  >
                    <NavLink
                      key={'logout'}
                      to={{
                        pathname: '/logout',
                        // or using createsearchparams if not using state
                        // , search: createSearchParams({mode: 'exit'}).toString()
                      }}
                      state={{ mode: 'exit' }}
                      className={clsxm('text-gray-50')}
                    >
                      Logout
                    </NavLink>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            {!token && (
              <NavLink key={'login'} to={generatePath('/login')} className="text-lg font-quan">
                {React.createElement(icons[1], { className: 'h-[18px] w-[18px] inline' })}Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
