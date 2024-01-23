import { useHover } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import useMenuLinkStyle from '@/constants/styles/mnMenuLink'
import { Box, Center, HoverCard, Group, Text, Anchor, Divider, SimpleGrid, UnstyledButton, ThemeIcon, rem } from '@mantine/core'
import {
  IconChevronDown,
  IconCode,
  IconCoin,
  IconBook,
  IconFingerprint,
  IconChartPie3,
  IconNotification,
} from '@tabler/icons-react'

export const DyNavBar = () => {
  const { classes: menuLinkStyle, theme } = useMenuLinkStyle()
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
    <div className="navbar bg-base-100" data-theme="lemonade">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="underline-flash">
            <a>Link</a>
          </li>
          <li className="underline-flash">
            <HoverCard width={600} position="bottom" radius={'md'} shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#">
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
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
    </div>
  )
}
