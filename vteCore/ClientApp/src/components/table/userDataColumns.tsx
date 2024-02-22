import { UserData } from '@/constants/types'
import dayjs from 'dayjs'
import { MRT_ColumnDef } from 'mantine-react-table'

export const UserDataColumns: MRT_ColumnDef<UserData>[] = [
  {
    accessorKey: 'userId',
    header: 'User Id',
    size: 50,
  },
  {
    accessorKey: 'userName',
    header: 'User Name',
    size: 100
  },
  {
    accessorKey: 'isControlAdmin',
    header: 'Is System Admin',
    filterVariant: 'checkbox',
    Cell: ({ cell }) => <input type="checkbox" checked={cell.getValue<boolean>()} className="checkbox" readOnly />,
    enableSorting: false,
    mantineFilterCheckboxProps: {
      label: 'Control Admin',
    },
    size: 100,
  },
  {
    accessorKey: 'loginedAt',
    header: 'Login Time',
    filterVariant: 'date-range',
    size: 100,
    Cell: ({cell}) => {
        const datevalue = cell.getValue<Date>();
        
        if(datevalue)
            return dayjs(datevalue).format('DD/MM/YYYY hh:mm');
        return '';

    },    

    // even filterFn provided, the filter will not be used for manual filtering enabled. (server data)
    filterFn: (row, _colIds, filtervalue, meta) => {
      // console.log(`the value here `,filtervalue,` with `,meta)
      const datevalue = row.getValue<Date>('loginedAt')
      const datestring = dayjs(datevalue).format('YYYYMMDD')
      let lowervalue = '19000101'
      let uppervalue = '39990101'
      if (filtervalue && filtervalue instanceof Array) {
        if (filtervalue.length > 1) {
          lowervalue = dayjs(filtervalue[0]).format('YYYYMMDD')
          uppervalue = dayjs(filtervalue[1]).format('YYYYMMDD')
        }
      } else {
        lowervalue = dayjs(filtervalue).format('YYYYMMDD')
      }

      return datestring >= lowervalue && datestring < uppervalue
    },
  },
]
