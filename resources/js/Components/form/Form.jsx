import { Tooltip } from '@/Components/Tooltip.jsx'

export const Form = ({ children, ...props }) => (
  <form {...props}>
    {children}
  </form>
)

const Fieldset = ({ legend, className = '', children }) => (
  <fieldset>
    <legend className={'text-2xl sm:text-2xl ' + className}>{legend}</legend>
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-x-5 gap-y-2 py-2'>
      {children}
    </div>
  </fieldset>
)

const Group = ({ children }) => (
  <div className='flex flex-col gap-2'>
    {children}
  </div>
)

const GroupLg = ({ children }) => (
  <div className='flex flex-col gap-2 2xl:col-span-2'>
    {children}
  </div>
)

const GroupXl = ({ children }) => (
  <div className='flex flex-col gap-2 col-span-1 lg:col-span-2 2xl:col-span-4'>
    {children}
  </div>
)

const InputGroup = ({ title, className = '', tooltip, children }) => (
  <div className={className}>
    <div className='flex items-baseline gap-2'>
      <span>
        {title}
      </span>
      {tooltip && (
        <Tooltip className='ms-auto'>
          {tooltip}
        </Tooltip>
      )}
    </div>
    <div className='flex flex-col gap-2 border rounded border-border dark:border-border-dark mt-2 py-2 px-3'>
      {children}
    </div>
  </div>
)

Form.Fieldset = Fieldset
Form.Group = Group
Form.GroupLg = GroupLg
Form.GroupXl = GroupXl
Form.InputGroup = InputGroup
