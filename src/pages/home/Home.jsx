// dependencies
import "./Home.scss";
import Header from "../../component/header/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import StatusCreationBox from "../../component/statusCreationBox/StatusCreationBox";

const Home = () => {
    // left sidebar top nav state 
    const [leftTopNavs, setLeftTopNavs] = useState([]);
    // show more / less state for left sidebar top nav
    const [showMore, setShowMore] = useState(false);
    // left sidebar bottom nav state 
    const [leftBottomNavs, setLeftBottomNavs] = useState([]);
    // show more / less state for left sidebar bottom nav
    const [showMoreBottom, setShowMoreBottom] = useState(false);


    // Show more handle for left sidebar top nav
    const handleShowMore = () => {
        setShowMore(true);
        getLeftTopNavs(200)
    }
    // Show less handle for left sidebar top nav
    const handleShowLess = () => {
        setShowMore(false);
        getLeftTopNavs(6)
    }


    // Show more handle for left sidebar bottom nav
    const handleShowMoreBottom = () => {
        setShowMoreBottom(true);
        getLeftBottomNavs(200)
    }
    // Show less handle for left sidebar bottom nav
    const handleShowLessBottom = () => {
        setShowMoreBottom(false);
        getLeftBottomNavs(6)
    }


    /**
     * GETTING HOME LEFT TOP NAV ITEMS
     * @param {*} itemCount : get 6 item by default
     */
    async function getLeftTopNavs(itemCount = 6) {
        const response = await axios.get(`http://localhost:5000/fb_home_left_top_nav?_limit=${itemCount}`)

        setLeftTopNavs(response.data);
    }
    // run once on load getLeftTopNavs function 
    useEffect(() => {
        getLeftTopNavs();
    }, []);


    /**
     * GETTING HOME LEFT BOTTOM NAV ITEMS
     * @param {*} itemCount : get 6 item by default
     */
    async function getLeftBottomNavs(itemCount = 6){
        const response = await axios.get(`http://localhost:5000/fb_home_left_bottom_nav?_limit=${itemCount}`);

        setLeftBottomNavs(response.data);
    }
    // run once on load getLeftBottomNavs function 
    useEffect(() => {
        getLeftBottomNavs();
    }, []);


  return <>
    <Header />
    <section className="main">
        <div className="sidebar-left">
            <ul className="list top-list">
                {/* Showing left sidebar left top nav by map loop  */}
                {leftTopNavs.map((item, index) => {
                    return <li key={index}>
                    <Link to={item.link_url}><span className="item-img" style={{backgroundImage: `url(${item.bg_img})`}}></span>{item.link_text}</Link>
                </li>
                })}
            </ul>
            <p className="top-nav-show-more-btn" onClick={showMore == false ? handleShowMore: handleShowLess}><span>{showMore == false ? <FaAngleDown />: <FaAngleUp />}</span>{showMore == false ? 'Show More': 'Show Less'}</p>

            <div className="shortcut-div d-flex justify-content-between align-items-center">
                <h6>Your Shortcut</h6>
                <p>Edit</p>
            </div>
            
            <ul className="list bottom-list">
                {/* Showing left sidebar left top nav by map loop  */}
                {leftBottomNavs.map((item, index) => {
                    return <li key={index} className={`type-${item.type}`}>
                    <Link to={item.link_url}><span className="item-img" style={{backgroundImage: `url(${item.bg_img})`}}></span>{item.link_text}</Link>
                </li>
                })}
            </ul>
            <p className="bottom-nav-show-more-btn" onClick={showMoreBottom == false ? handleShowMoreBottom: handleShowLessBottom}><span>{showMoreBottom == false ? <FaAngleDown />: <FaAngleUp />}</span>{showMoreBottom == false ? 'Show More': 'Show Less'}</p>

            <ul className="footer-links d-flex">
                <li>
                    <Link to="/privacy">Privacy</Link>
                </li>
                <li>
                    <Link to="/terms">Terms</Link>
                </li>
                <li>
                    <Link to="/advertising">Advertising</Link>
                </li>
                <li>
                    <Link to="/ads">Ad Choices</Link>
                </li>
                <li>
                    <Link to="/cookies">Cookies</Link>
                </li>
                <li>
                    <Link to="/more">More</Link>
                </li>
                <li>
                Meta © 2023
                </li>
            </ul>
        </div>
        <div className="middle-content">
            {/* Status Adding Card -- Start */}
            <StatusCreationBox />
            {/* Status Adding Card -- End */}
        </div>
        <div className="sidebar-right">
        <h3>sidebar right will added soon..</h3>
        </div>
    </section>
  </>;
};

export default Home;
