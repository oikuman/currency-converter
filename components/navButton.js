import Link from "next/link";
import { withRouter } from "next/router";

import css from "./navButton.module.css";

const NavButton = (props) => (
  <Link href={props.path}>
    <div className={css.NavButton}>
      <div className={css.Icon}>{props.icon}</div>
      <span className={css.Label}>{props.label}</span>
    </div>
  </Link>
);

export default withRouter(NavButton);
