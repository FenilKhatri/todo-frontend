import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

function CardLink({ to, children }) {
  return (
    <Link to={to} className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
      {children} <LuArrowRight size={15} />
    </Link>
  );
}

export default CardLink;
