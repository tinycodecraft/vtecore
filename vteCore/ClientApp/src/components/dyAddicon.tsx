import { Code } from '@mantine/core'
import { IconFilePlus, IconPlus } from '@tabler/icons-react'

interface dyAddProps {
  label: string
}
export const DyAddicon = ({ label }: dyAddProps) => {
  return (
    <div role="button" className="btn btn-circle !bg-transparent border-none">
      <div className="indicator ">
      <IconFilePlus size={`2rem`} className='text-red-500' />
        <span className="badge text-red-400 badge-primary bage-xs indicator-item border-none bg-transparent whitespace-pre">{`    ${label}`}</span>
      </div>

    </div>
  )
}
