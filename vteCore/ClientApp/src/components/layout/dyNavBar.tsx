import { useHover, useViewportSize } from '@mantine/hooks'
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
} from '@tabler/icons-react'
import { NavLink, createSearchParams } from 'react-router-dom'
import { generatePath } from 'react-router'
import routes from '@/constants/routes/config'
import { HubInit, HubState, MenuPositionEnum } from '@/constants/types'
import { useAppSelector } from '@/hooks'

export const DyNavBar = () => {
  const { classes: menuLinkStyle, theme } = useMenuLinkStyle()
  const [openHovered, setOpenHover] = useState(false)
  const { token } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  //the following setOpenHover cause problem to any setState function
  //timeout is only method found to work without problem
  const openclose = useCallback(async () => {
    setTimeout(() => {
      setOpenHover(!openHovered)
    }, 1000)
  }, [openHovered, setOpenHover])
  const icons = [IconHome, IconLock, IconCloudCog, IconLogout]

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
    <div className="navbar bg-base-100" data-theme="cyberpunk">
      <div className="flex-none">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-grow justify-center">
        <ul className="menu menu-horizontal px-1">
          {routes
            .filter((e) => e.position === MenuPositionEnum.center && (!e.locked || token))
            .map((route, index) => {
              return (
                <li className="underline-flash" key={`${route.name}-${index}`}>
                  <NavLink
                    key={route.name}
                    to={generatePath(route.path, route.params)}
                    className={({ isActive }) => (isActive ? 'is-active' : '')}
                  >
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
                <a href="#" className={menuLinkStyle.menulink}>
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
        </ul>
      </div>
      <div className="flex-none">
        <LanguageControl />
        <ul className="menu menu-horizontal px-1">
          <li className="underline-flash">
            {token && (
              <NavLink
                key={'logout'}
                to={{
                  pathname: '/logout',
                  // or using createsearchparams if not using state
                  // , search: createSearchParams({mode: 'exit'}).toString()
                }}
                state={{ mode: 'exit' }}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {React.createElement(icons[3], { className: 'h-[18px] w-[18px] inline' })}Logout
              </NavLink>
            )}
            {!token && (
              <NavLink
                key={'login'}
                to={generatePath('/login')}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {React.createElement(icons[1], { className: 'h-[18px] w-[18px] inline' })}Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
