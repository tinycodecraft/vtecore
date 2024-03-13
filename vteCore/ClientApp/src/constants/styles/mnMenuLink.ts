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
  simplelink : {
    fontWeight: 600,
    fontSize: theme.fontSizes.md,

  },
  menulink: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.brand[6] : theme.colors.brand[0],
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
    '& .arrow': {
      transform: 'rotate(0deg)',
      transition: 'all 0.25s ease-in-out',
    },

    '&[aria-expanded="true"] .arrow': {
      transform: 'rotate(180deg)',
      transition: 'all 0.25s ease-in-out',
    },
    ...theme.fn.hover({
      '& *': {
        color: theme.colorScheme === 'dark' ? theme.colors.indigo[3]:theme.colors.indigo[8],
      }
    })

  },
  sublinkonly: {

    '& button': {
      ...theme.fn.hover({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.lime[2] : theme.colors.lime[0],
        color: theme.colorScheme === 'dark' ? theme.colors.indigo[7]:theme.colors.indigo[3],  
      })
    }

  },

  childLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.lime[2] : theme.colors.lime[0],
      color: theme.colorScheme === 'dark' ? theme.colors.dark[7]:theme.colors.dark[3],
      fontWeight: 700,
      '& *': {
        color: theme.colorScheme === 'dark' ? theme.colors.indigo[8]:theme.colors.indigo[3],
        fontWeight: 700,
      }
    }),

    '&:active': theme.activeStyles,
  },
}))
