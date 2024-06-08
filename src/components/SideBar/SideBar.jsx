import Logo from '../SideBar/Logo/Logo';
import css from './SideBar.module.css';
import CreateNewBoard from '../CreateNewBoard/CreateNewBoard';
import NeedHelp from '../SideBar/NeedHelp/NeedHelp';
import LogOut from '../SideBar/LogOut/LogOut';
// dispatch + useRef(?) + loader (?)

const SideBar = () => {
  return (
    <div className={css.cont}>
      <div>
        <div className={css.upperPart}>
          <Logo />
          <h3 className={css.myBoardsTitle}>My boards</h3>
          <CreateNewBoard />
          {/* error, isLoading */}
        </div>
        <div className={css.bottomPart}>
          <NeedHelp />
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
