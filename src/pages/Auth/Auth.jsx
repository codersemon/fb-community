import { Link } from "react-router-dom";
import Meta from "../../component/meta/Meta";
import "./Auth.scss";
import Modal from "../../component/modal/Modal";
import { useState } from "react";
import { FaPlus, FaCircleQuestion } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { monthArray } from "../../faker/faker";
import { validationFunc } from "../../utils/Utils";
import { toast } from "react-toastify";

const Auth = () => {
  // create account modal state
  const [modal, setModal] = useState(false);

  // generate year array
  const yearArray = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
  );

  // generate day array
  let dayArray = Array.from({ length: 31 }, (_, i) => 1 + i);


  // reg input state
  const [input, setInput] = useState({
    fname: "",
    sname: "",
    username: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  // handle input
  const handleInput = (e) => {
    // update input data and state 
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    // input empty validation 
    validationFunc(e);
  };

  // onblur empty validation handle
  const handleBlur = (e) => {
    validationFunc(e);
  };

  // handle submit 
  const handleRegSubmit = (e) => {
    e.preventDefault();
    

    if(!input.fname || !input.sname || !input.username || !input.password || !input.day || !input.month || !input.year || !input.gender){
      toast.error('All fields are required!', {position: "top-center"});
    }
  }

  // login state 
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: ''
  })

  // handle login input 
  const handleLoginInput = (e)  => {
    setLoginInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // handle login submit 
  const loginHandle = (e) => {
    e.preventDefault();

    // validation 
    if(!loginInput.username || !loginInput.password){
      toast.error('Email or Phone & Password is Required', {position: 'top-center'});
    }else{
     toast.success('Login Success!', {position: 'top-center'})
    }

  }
 

  return (
    <>
      <Meta>
        <title>Facebook - log in or sign up</title>
      </Meta>

      {/* Create account modal  start*/}
      {modal && (
        <Modal
          title="Sign Up"
          subtitle="It's quick and easy."
          modalControl={setModal}
          className="create-account-modal"
        >
          <form className="user-reg-form" onSubmit={handleRegSubmit}>
            <div className="h-field">
              <div className="input-wrap">
                <input
                  type="text"
                  name="fname"
                  placeholder="First name"
                  value={input.fname}
                  onChange={handleInput}
                  onBlur={handleBlur}
                />
                <span className="validation-icon">
                  <FaExclamationCircle />
                </span>
              </div>
              <div className="input-wrap">
                <input
                  type="text"
                  name="sname"
                  placeholder="Surname"
                  value={input.sname}
                  onChange={handleInput}
                  onBlur={handleBlur}
                />
                <span className="validation-icon">
                  <FaExclamationCircle />
                </span>
              </div>
            </div>

            <div className="input-wrap">
              <input
                type="text"
                name="username"
                placeholder="Mobile number or email address"
                value={input.username}
                onChange={handleInput}
                onBlur={handleBlur}
              />
              <span className="validation-icon">
                <FaExclamationCircle />
              </span>
            </div>

            <div className="input-wrap">
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={input.password}
                onChange={handleInput}
                onBlur={handleBlur}
              />
              <span className="validation-icon">
                <FaExclamationCircle />
              </span>
            </div>

            <div className="h-field-extra">
              <div className="h-field-extra-label">
                <label>
                  Date of birth{" "}
                  <span
                    className="info-toggle"
                    title="click for more information"
                  >
                    <FaCircleQuestion />
                  </span>
                </label>
                <span className="validation-icon">
                  <FaExclamationCircle />
                </span>
              </div>
              <div className="h-field-extra-fields">
                <select name="day" onChange={handleInput}>
                  {dayArray.map((item, index) => {
                    return (
                      <option
                        value={item}
                        key={index}
                        selected={new Date().getDate() == item ? true : false}
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>

                <select name="month" onChange={handleInput}>
                  {monthArray.map((item, index) => {
                    return (
                      <option
                        value={item}
                        key={index}
                        selected={
                          new Date().getMonth() + 1 == item ? true : false
                        }
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>

                <select name="year" onChange={handleInput}>
                  {yearArray.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="h-field-extra">
              <div className="h-field-extra-label">
                <label>
                  Gender{" "}
                  <span
                    className="info-toggle"
                    title="click for more information"
                  >
                    <FaCircleQuestion />
                  </span>
                </label>
              </div>
              <div className="h-field-extra-fields">
                <label>
                  <span>Female</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleInput}
                  />
                </label>

                <label>
                  <span>Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleInput}
                  />
                </label>

                <label>
                  <span>Custom</span>
                  <input
                    type="radio"
                    name="gender"
                    value="Custom"
                    onChange={handleInput}
                  />
                </label>
              </div>
            </div>

            {input.gender == 'Custom' && <div className="custom-extra">
            <div className="input-wrap">
              <select name="pronoun" onChange={handleInput} onBlur={handleBlur}>
                <option value=''>Select your pronoun</option>
                <option value="1">She: Wish her a happy birthday!</option>
                <option value="2">He: Wish him a happy birthday!</option>
                <option value="3">They: Wish them a happy birthday!</option>
              </select>
              <span className="validation-icon">
                <FaExclamationCircle />
              </span>
            </div>

            <div className="input-wrap">
              <label>Your pronoun is visible to everyone.</label>
              <input
                type="text"
                name="gender_optional"
                placeholder="Gender (optional)"
                value={input.password}
                onChange={handleInput}
              />
            </div>
            </div>}

            <p>
              People who use our service may have uploaded your contact
              information to Facebook. <Link>Learn more.</Link>
            </p>
            <p>
              By clicking Sign Up, you agree to our <Link>Terms</Link>,{" "}
              <Link>Privacy Policy</Link> and <Link>Cookies Policy</Link>. You
              may receive SMS notifications from us and can opt out at any time.
            </p>

            <button type="submit" className="sign-up-btn">
              Sign Up
            </button>
          </form>
        </Modal>
      )}
      {/* Create account modal  end*/}

      <section className="fb-auth-wrap">
        <div className="container">
          <div className="auth-left">
            <img src="./img/fb-logo.png" alt="" />
            <h2>
              Facebook helps you connect and share with the people in your life.
            </h2>
          </div>
          <div className="auth-right">
            <div className="auth-box">
              {/* login form start  */}
              <form onSubmit={loginHandle}>
                <input
                  type="text"
                  name="username"
                  placeholder="Email address or phone number"
                  value={loginInput.username}
                  onChange={handleLoginInput}
                />
                <input type="password" name="password" placeholder="Password" value={loginInput.password} onChange={handleLoginInput}/>
                <input type="submit" value="Log in" className="login-btn" />
              </form>
              {/* login form end  */}

              <Link to="/" className="forgot-link">
                Forgotten password?
              </Link>

              <div className="divider"></div>

              {/* open registration modal on click  */}
              <button className="create-btn" onClick={() => setModal(true)}>
                Create new account
              </button>
            </div>

            <p className="page-msg">
              <Link to="/">Create a Page</Link> for a celebrity, brand or
              business.
            </p>
          </div>
        </div>
      </section>

      <section className="auth-footer">
        <div className="container">
          <div className="lang-wrap">
            <ul>
              <li>English (UK)</li>
              <li>
                <Link>বাংলা</Link>
              </li>
              <li>
                <Link>অসমীয়া</Link>
              </li>
              <li>
                <Link>हिन्दी</Link>
              </li>
              <li>
                <Link>नेपाली</Link>
              </li>
              <li>
                <Link>Bahasa Indonesia</Link>
              </li>
              <li>
                <Link>العربية</Link>
              </li>
              <li>
                <Link>中文(简体)</Link>
              </li>
              <li>
                <Link>Bahasa Melayu</Link>
              </li>
              <li>
                <Link>Español</Link>
              </li>
              <li>
                <Link>Português (Brasil)</Link>
              </li>
              <li className="more-lang-modal">
                <FaPlus />
              </li>
            </ul>
          </div>

          <div className="links-wrap">
            <ul>
              <li>
                <Link>Sign Up</Link>
              </li>
              <li>
                <Link>Log in</Link>
              </li>
              <li>
                <Link>Messenger</Link>
              </li>
              <li>
                <Link>Facebook Lite</Link>
              </li>
              <li>
                <Link>Video</Link>
              </li>
              <li>
                <Link>Places</Link>
              </li>
              <li>
                <Link>Games</Link>
              </li>
              <li>
                <Link>Marketplace</Link>
              </li>
              <li>
                <Link>Meta Pay</Link>
              </li>
              <li>
                <Link>Meta Store</Link>
              </li>
              <li>
                <Link>Meta Quest</Link>
              </li>
              <li>
                <Link>Instagram</Link>
              </li>
              <li>
                <Link>Threads</Link>
              </li>
              <li>
                <Link>Fundraisers</Link>
              </li>
              <li>
                <Link>Services</Link>
              </li>
              <li>
                <Link>Voting Information Centre</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Privacy Centre</Link>
              </li>
              <li>
                <Link>Groups</Link>
              </li>
              <li>
                <Link>About</Link>
              </li>
              <li>
                <Link>Create ad</Link>
              </li>
              <li>
                <Link>Create Page</Link>
              </li>
              <li>
                <Link>Developers</Link>
              </li>
              <li>
                <Link>Careers</Link>
              </li>
              <li>
                <Link>Cookies</Link>
              </li>
              <li>
                <Link>AdChoices</Link>
              </li>
              <li>
                <Link>Terms</Link>
              </li>
              <li>
                <Link>Help</Link>
              </li>
              <li>
                <Link>Contact</Link>
              </li>
              <li>
                <Link>Uploading and non-users</Link>
              </li>
            </ul>
          </div>

          <p className="footer-copyright">Meta © 2023</p>
        </div>
      </section>
    </>
  );
};

export default Auth;
