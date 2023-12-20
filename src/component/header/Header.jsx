// dependencies
import { Link } from "react-router-dom";
import "./Header.scss";
import { IoIosSearch } from "react-icons/io";
import { RiHome5Fill, RiGroup2Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { LuGamepad2 } from "react-icons/lu";
import { TbGridDots } from "react-icons/tb";
import { FaFacebookMessenger } from "react-icons/fa";
import { HiMiniBell } from "react-icons/hi2";
import { Badge } from "react-bootstrap";

const Header = () => {
  return <header className="header-wrap">
    <div className="px-3 d-flex justify-content-between align-items-center">
      <div className="header-left d-flex">
        <Link to='/home' className="logo"><img className="w-100" src="./img/fb-icon.png" alt="" /></Link>

        <div className="search-box">
          <form >
            <label htmlFor="" className="d-flext">
            <IoIosSearch />
              <input type="text" placeholder="Search Facebook" />
            </label>
          </form>
        </div>
      </div>
      <div className="header-middle">
        <ul className="header-middle-nav d-flex justify-content-center align-items-center">
          <li>
            <Link to="/home" className="active"><RiHome5Fill /></Link>
          </li>
          <li>
            <Link to="/friends"><BsPeople /></Link>
          </li>
          <li>
            <Link to="/marketplace"><AiOutlineShop /></Link>
          </li>
          <li>
            <Link to="/groups"><RiGroup2Line /></Link>
          </li>
          <li>
            <Link to="/gaming/play"><LuGamepad2 className="no-fill" /></Link>
          </li>
        </ul>
      </div>
      <div className="header-right">
        <ul className="header-right-nav d-flex justify-content-end align-items-center">
          <li><TbGridDots /></li>
          <li><FaFacebookMessenger /></li>
          <li><HiMiniBell /> <Badge>12</Badge></li>
          <li><img src="https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-1/324503666_575897801048520_7553017535435239467_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_eui2=AeHXZQ0bJaajHnNLak8c6ytKPi8ibBh8G-8-LyJsGHwb7-3W-_YqNxSK3vFsBvs0e6YPm6Xzl6WsdbzxHvjdgOic&_nc_ohc=QEsLseNhwZkAX85CmEX&_nc_ht=scontent.fdac7-1.fna&oh=00_AfDlW_L5iuotOv0WK9-dJv9tU3mSW8Yn2uNnKcdSP3QSNQ&oe=658693FA" alt="" /></li>
        </ul>
      </div>
    </div>
  </header>;
};

export default Header;


