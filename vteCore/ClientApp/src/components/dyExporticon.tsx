import { Code } from '@mantine/core'
import {  IconTableExport } from '@tabler/icons-react'

interface DyExportProps {
  label: string
}
export const DyExporticon = ({ label }: DyExportProps) => {
  return (
    <div role="button" className="btn btn-circle !bg-transparent border-none">
      <div className="indicator ">
      <IconTableExport size={`2rem`} className='text-blue-600' />
        <span className="badge text-blue-300 badge-primary bage-xs indicator-item border-none bg-transparent whitespace-pre">{`           ${label}`}</span>
      </div>

    </div>
  )
}
