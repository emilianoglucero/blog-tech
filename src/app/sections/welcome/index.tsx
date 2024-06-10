// import { findClosestNextImageWidth } from '../../../lib/utils/image'
import Image from 'next/image'

import authorPic from '../../images/author/emi.png'
import s from './welcome.module.css'

export const Welcome = () => {
  return (
    <div className={s.welcome}>
      <h1 className={s.title}>digital digital</h1>
      <div className={s.subtitle}>
        <div>
          by{' '}
          <a
            href="https://www.emilianolucero.ar"
            target="_blank"
            rel="noopener"
          >
            {' '}
            <span className={s.underline}>emi </span>
            <div className={s.authorPic}>
              <Image
                src={authorPic}
                alt="Photo of the author of the blog - Emiliano Lucero"
                style={{
                  width: 'auto',
                  height: '600px'
                }}
              />
            </div>
          </a>
        </div>
      </div>

      <div className={s.description}>
        <p>writings, explorations and stuff.</p>
      </div>
      <div className={s.links}>
        <ul>
          <li>
            <a href="#">
              <h2>
                Los años y tu proyecto personal, pensamientos sobre como
                mantanerlo en el tiempo de manera austera y funcional, December
                11, 2023
              </h2>
            </a>
          </li>
        </ul>
      </div>
      <div className={s.info}>
        <p className={s.author_name}>Emiliano Lucero</p>
        <p className={s.author_description}>
          A software engineer based in Rosario, Argentina.
        </p>
        <p className={s.author_email}>emilianoglucero@gmail.com</p>
      </div>
    </div>
  )
}
