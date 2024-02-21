import { UserData } from '@/constants/types'
import { MRT_ColumnDef } from 'mantine-react-table'

export const UserDataColumns: MRT_ColumnDef<UserData>[] = [
  {
    accessorKey: 'userId',
    header: 'User Id',
  },
  {
    accessorKey: 'userName',
    header: 'User Name',
  },
  {
    accessorKey: 'isControlAdmin',
    header: 'Is System Admin',
    filterVariant: 'checkbox',
    Cell: ({ cell }) => <input type="checkbox" checked={cell.getValue<boolean>()} className="checkbox" />,

    mantineFilterCheckboxProps: {
      label: 'Control Admin',
    },
  },
]
