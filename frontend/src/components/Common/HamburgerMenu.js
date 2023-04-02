import { RxHamburgerMenu } from "react-icons/rx"

const HamburgerMenu = ({ toggleMenu }) => {

  return (
    <div className="hamburger-menu">
      <button className='icon-button' style={{padding: '10px'}} onClick={()=>toggleMenu()}>
        <RxHamburgerMenu size={'30px'} color='white' />
      </button>

    </div>
  );
};

export default HamburgerMenu;