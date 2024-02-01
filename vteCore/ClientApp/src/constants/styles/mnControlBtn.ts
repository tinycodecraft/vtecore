import { createStyles, rem } from '@mantine/core'

export default createStyles((theme) => ({
  control: {
    ...theme.fn.focusStyles(),
    width: rem(34),
    height: rem(34),
    borderRadius: theme.radius.md,
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.indigo[5] : theme.colors.brand[0],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.yellow[0],
      border: `${rem(0.5)} solid ${theme.colorScheme === 'dark' ? theme.colors.indigo[5] : theme.colors.brand[0]}`,      
    },
  },
}))
