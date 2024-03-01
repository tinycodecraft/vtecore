import { createStyles, rem } from '@mantine/core'

export default createStyles((theme) => ({
  select: {
    '& .arrow': {
      transform: 'rotate(0deg)',
      transition: 'all 0.25s ease-in-out',
    },

    // focus-within work but the focus is not leaving after close, not work properly
    '&:focus-within .arrow': {
      transform: 'rotate(180deg)',
      transition: 'all 0.25s ease-in-out',
    },
  },
  menulink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.brand[6] : theme.colors.brand[0],
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    '& .arrow': {
      transform: 'rotate(0deg)',
      transition: 'all 0.25s ease-in-out',
    },

    '&[aria-expanded="true"] .arrow': {
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
