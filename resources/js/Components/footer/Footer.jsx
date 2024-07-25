import React from 'react'
import euLogo from '../../../images/eu_logo.jpg'
import logo from '../../../images/logo.png'

function Footer() {
  return (
    <>
      <footer className="sm:hidden">
        <SmallFooter />
      </footer>

      <footer className="hidden sm:block">
        <LargeFooter />
      </footer>
    </>
  )
}

export default Footer

function LargeFooter() {
  return (
    <footer className='h-footer bg-background-color-muted dark:bg-background-color-dark-muted grid grid-cols-3 items-center border-t border-border dark:border-border-dark'>
      <div className='flex gap-5 justify-start pl-4'></div>
      <div className='text-sm justify-self-center'>Copyright © 2024 Retold</div>
      <div className='text-sm justify-self-end pr-4'>contact@retold.com</div>
    </footer>
  );
}

function SmallFooter() {
  return (
    <footer className='h-footer bg-background-color-muted dark:bg-background-color-dark-muted grid grid-cols-2 items-center border-t border-border dark:border-border-dark pb-2 mt-4'>
      <div className='flex gap-5 pl-4 text-sm'>
        <img src={euLogo} alt='EU logo' className='w-12 h-auto' />
        <img src={logo} alt='EU logo' className='w-24 h-auto' />
      </div>
      <div className='justify-self-end mr-4'>
        <div className='text-sm justify-self-center'>Copyright © 2024 Retold</div>
        <div className='text-sm justify-self-end pr-4'>contact@retold.com</div>
      </div>
    </footer>
  );
}