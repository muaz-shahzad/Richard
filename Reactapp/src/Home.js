import React from 'react';
import styles from './Home.css';
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import './Home.css'


const Home = () => {
    return (
        <>
            {/* <header className={`${styles['App-header']} text-center`}>
                <h1 className={styles['App-title']}>TrapStar Financial Assistant</h1>
            </header> */}

            {/* <main className={`container ${styles['App-main-container']}`}>
                <div className="row justify-content-around">
                    {['Overview', 'Expenses', 'Financial Goals', 'Investments'].map((section, index) => (
                        <section key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className={`card card-custom h-100`}>
                                <div className={`card-header card-header-custom`}>
                                    <h2 className="card-title">{section}</h2>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Discover insights about your {section.toLowerCase()}.</p>
                                    <button className="btn btn-outline-dark">Explore</button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </main> */}


            <section className="header home mb-5">
                <div className="container" style={{ paddingTop: "50px" }}>
                    <div className="row mb-5">
                        <div className="">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-6 order-1 order-lg-1 d-flex justify-content-center flex-column">
                                    <h1>
                                        Stock Success through Consistency
                                    </h1>
                                    <p>Consistency fuels your stock market journey, paving the way for enduring success. Embrace steady commitment and watch your investments thrive.</p>
                                    <div className="mt-2">
                                        <NavLink to="assistant" className="btn-get-started">
                                            Explore Now <IoIosArrowForward />
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-lg-2 header-img mb-5" >
                                    <img src="https://www.shutterstock.com/image-photo/reading-documents-family-couple-study-600nw-2070674882.jpg" className="img-fluid rounded-5 " alt="home-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={`${styles['App-footer']} text-center mt-5`}>
                <p>&copy; 2024 TrapStar Financial Assistant. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Home;
