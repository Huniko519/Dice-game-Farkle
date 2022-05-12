import React from "react";
import telegram from "../../assests/img/tlgrm.svg";
import skype from "../../assests/img/skype.svg";
const Footer = ({ start }) => {
  let styleLinks = !start ? "links-continer" : "links-continer-after-start";

  return (
    <div className={styleLinks}>
      <div>
        <p className="Links-p">
          <a href="blanto0325@gmail.com" target="_blank">
            Built by Hu Jie
          </a>
        </p>
      </div>
      <div className="links">
        <a className="link" href="https://t.me/jgs20619">
          <img src={telegram} height={"60px"} weight={"60px"} />
        </a>
        <a className="link" href="">
          <img src={skype} height={"50px"} weight={"50px"} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
