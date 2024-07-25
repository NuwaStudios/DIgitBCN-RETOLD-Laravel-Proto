import { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head, Link, useForm } from '@inertiajs/react'
import { TextInput } from '@/Components/form/inputs/TextInput'
import { CheckboxInput } from '@/Components/form/inputs/Checkbox'
import googleLogo from '../../../images/google_logo.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

export default function Login ({ status, canResetPassword }) {
  const [showPassword, setShowPassword] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    disabled: '',
    remember: false
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title='Log in' />

      {status && <div className='mb-4 font-medium text-sm text-green-600'>{status}</div>}

      <form onSubmit={submit}>
        <h2 className='flex justify-center text-xl font-semibold text-center mb-4'>Login</h2>
        <div>
          <TextInput
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            value={data.email}
            className='mt-1 block w-full dark:bg-inherit'
            autoComplete='username'

            onChange={(e) => setData('email', e.target.value)}
          />

          <InputError message={errors.email} className='mt-2' />
          <InputError message={errors.disabled} className='mt-2' />
        </div>

        <div className='mt-4'>
          <div className='relative'>
            <TextInput
              id='password'
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              name='password'
              placeholder='Password'
              value={data.password}
              className='mt-1 block w-full pr-10' // Added padding to accommodate the icon
              autoComplete='current-password'
              onChange={(e) => setData('password', e.target.value)}
            />
            <div className='absolute inset-y-0 right-0 pr-3 rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 mt-2 flex items-center justify-center'>
              {showPassword
                ? (
                  <EyeFilled
                    className='h-5 w-5 text-gray-400 cursor-pointer'
                    onClick={() => setShowPassword(false)}
                    aria-hidden='true'
                  />
                  )
                : (
                  <EyeInvisibleFilled
                    className='h-5 w-5 text-gray-400 cursor-pointer'
                    onClick={() => setShowPassword(true)}
                    aria-hidden='true'
                  />
                  )}
            </div>
          </div>
          <InputError message={errors.password} className='mt-2' />
        </div>

        <div className='flex justify-start mt-4'>
          <div onClick={() => setData({ ...data, remember: !data.remember })} className='flex items-center cursor-pointer'>
            <CheckboxInput
              name='remember'
              value={data.remember}
              onChange={(e) => setData({ ...data, remember: e.target.checked })}
            />
            <span className='ml-2'>Remember me</span>
          </div>
        </div>

        <div className='flex justify-center mt-4'>
          <PrimaryButton className='w-full text-white bg-main-color-dark dark:bg-main-color-dark-muted dark:text-black ' disabled={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>

      <div className='flex justify-center mt-4'>
        {canResetPassword && (
          <Link
            href={route('password.request')}
            className='underline text-sm outline-none text-accent-color-dark-muted dark:text-accent-color-muted hover:text-main-color-muted dark:hover:text-text-muted'
          >
            Forgot your password?
          </Link>
        )}
      </div>

      <div class='border-b border-gray-300 my-8' />

      <div class='flex justify-center'>
        <p>Don't have an account? <Link
          href={route('register')}
          className='underline t text-main-color-dark-muted hover:text-main-color-muted dark:hover:text-main-color-dark'
                                  >
          Sign up for Retold
        </Link>
        </p>

      </div>

      <div className='inline-flex items-center justify-center w-full'>
        <hr className='w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
        <span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-background-color-dark-muted'>or</span>
      </div>

      <div className='flex justify-center mt-2'>
        <div className='flex items-center justify-center mb-8 shadow-md px-4 py-2 border border-gray-300 dark:hover:bg-white dark:hover:text-black'>
          <img src={googleLogo} class='w-7 h-7 mr-3' alt='google logo' />
          <a
            // href={route('/google-auth/redirect')}
            href='/google-auth/redirect'
            className='text-sm  rounded-md focus:outline-none'
          >
            Sign up with Google
          </a>
        </div>

      </div>
    </GuestLayout>
  )
}
