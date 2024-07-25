// Laravel::Auth
export default function PrimaryButton({ className = '', disabled = false, remove, children, ...props }) {
  return (
    <button
      {...props}
      className={'py-2 px-3 rounded bg-accent-color dark:bg-accent-color-dark ' + (disabled ? 'text-accent-color-muted dark:text-accent-color-dark-muted ' : 'lg:hover:bg-main-color lg:hover:dark:bg-main-color-dark ' + (remove ? ' text-red-500 lg:hover:outline outline-1 outline-red-500 ' : ' ')) + className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
