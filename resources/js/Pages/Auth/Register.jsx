import { useEffect, useState } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { TextInput } from '@/Components/form/inputs/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Register() {
  const key = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' /* temporal dummy key for testing purposes */
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation')
    }
  }, [])

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(match.matches);

    const handler = (event) => setIsDarkMode(event.matches);
    match.addListener(handler);

    return () => match.removeListener(handler);
  }, []);

  const submit = (e) => {
    e.preventDefault()

    post(route('register'))
  }

  return (
    <GuestLayout>
      <Head title='Register' />

      <form onSubmit={submit}>
        <div>
          <TextInput
            id='name'
            name='name'
            value={data.name}
            className='mt-1 block w-full'
            autoComplete='name'

            onChange={(e) => setData('name', e.target.value)}
            required
          >
            Name
          </TextInput>

          <InputError message={errors.name} className='mt-2' />
        </div>

        <div className='mt-4'>
          <TextInput
            id='email'
            type='email'
            name='email'
            value={data.email}
            className='mt-1 block w-full'
            autoComplete='username'
            onChange={(e) => setData('email', e.target.value)}
            required
          >
            Email
          </TextInput>

          <InputError message={errors.email} className='mt-2' />
        </div>

        <div className='mt-4'>
          <TextInput
            id='password'
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            autoComplete='new-password'
            onChange={(e) => setData('password', e.target.value)}
            required
          >
            Password
          </TextInput>

          <InputError message={errors.password} className='mt-2' />
        </div>

        <div className='mt-4'>
          <TextInput
            id='password_confirmation'
            type='password'
            name='password_confirmation'
            value={data.password_confirmation}
            className='mt-1 block w-full'
            autoComplete='new-password'
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
          >
            Confirm Password
          </TextInput>

          <InputError message={errors.password_confirmation} className='mt-2' />
        </div>

        <div className='mt-8 mb-8'>
          <ReCAPTCHA sitekey={key} onChange={setIsRecaptchaValid} theme={isDarkMode ? 'dark' : 'light'} />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <Link
            href={route('login')}
            className='underline text-sm text-gray-600 lg:dark:hover:text-background-color rounded-md focus:outline-none'
          >
            Already registered?
          </Link>

          <PrimaryButton
            className={`ms-4 text-white bg-main-color-dark dark:!bg-main-color-dark-muted dark:hover:!bg-main-color-dark
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:lg:hover:bg-gray-400`}
            disabled={!data.name || !data.email || !data.password || !data.password_confirmation || !isRecaptchaValid}
          >
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
