import React from 'react'
import styles from './Hero.module.css'
import companyLogo1 from '../../assets/Home/companylogo1.svg'
import companyLogo2 from '../../assets/Home/companylogo2.svg'
import companyLogo3 from '../../assets/Home/companylogo3.svg'
import companyLogo4 from '../../assets/Home/companylogo4.svg'
import companyLogo5 from '../../assets/Home/companylogo5.svg'
import coverImg from '../../assets/Home/coverimage.svg'
import arrowRight from '../../assets/Home/arrowRight.svg'
import playBtn from '../../assets/Home/playBtn.svg'
export default function Hero() {

  return (
    <section className={styles.container}>
        <div className={styles.body}>
            <div className={styles.leftContent}>
                <h2>Grow Your Business Faster With Hubly CRM</h2>
                <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</p>
                <div className={styles.buttons}>
                  <button className={styles.button}>
                    <span>Get started</span>
                    <img src={arrowRight} alt="Arrow right" />
                  </button>
                  <div className={styles.playVid}>
                    <img src={playBtn} alt="Play Button" />
                    <span>Watch Video</span>
                  </div>

                </div>
            </div>
            <div className={styles.rightContent}>
              <img src={coverImg} alt="Cover Img" />
            </div>
        </div>
        <footer>
            <img src={companyLogo1} alt="Adobe" />
            <img src={companyLogo2} alt="ELastic" />
            <img src={companyLogo3} alt="Opendoor" />
            <img src={companyLogo4} alt="Airtable" />
            <img src={companyLogo2} alt="Elastic" />
            <img src={companyLogo5} alt="Framer" />
        </footer>
    </section>
  )
}
