import { DemoFormState, SelectOption } from './views'

export const SELECT_OPTION_TEMPLATE: SelectOption[] = [
  { value: '', label: '(All)' },
  { value: '', label: '(Any)' },
]

export const DemoFormStateInit: DemoFormState={
    count: 0,
    checked: false,
    selectedOption: SELECT_OPTION_TEMPLATE[0]
}