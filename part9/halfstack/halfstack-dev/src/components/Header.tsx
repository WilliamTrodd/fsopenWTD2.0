import { HeaderProps } from "../types";

const Header = (props: HeaderProps) => (
  <h1>{props.courseName}</h1>
);

export default Header;