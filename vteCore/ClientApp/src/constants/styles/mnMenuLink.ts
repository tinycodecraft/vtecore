import { createStyles, rem } from '@mantine/core'

export default createStyles((theme) => ({
  menulink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    '& svg': {
      transform: 'rotate(0deg)',
      transition: 'all 0.25s ease-in-out',
    },

    '& svg.active': {
      transform: 'rotate(180deg)',
      transition: 'all 0.25s ease-in-out',
    },
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.brand[6] : theme.colors.brand[0],
    }),
  },

  childLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.brand[7] : theme.colors.brand[0],

    }),

    '&:active': theme.activeStyles,

  },  
}))
