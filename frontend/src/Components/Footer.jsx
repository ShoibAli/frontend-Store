import { Link } from "react-router-dom";

function Footer({ text, to }) {
  return (
    <div className="text-sm text-slate-500">
      {text}
      <Link className="pointer underline cursor-pointer pl-1" to={to}>
        {"Sign Up"}
      </Link>
    </div>
  );
}

export default Footer;
