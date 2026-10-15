import { Link } from "react-router-dom";
import { LuColumns2 } from "react-icons/lu";
import Card from "../../../components/Card";
import { boardColor } from "../../tasks/task.utils";
import CardLink from "./CardLink";

function BoardsOverviewCard({ boards, limit = 5 }) {
  return (
    <Card title="Your boards" action={<CardLink to="/boards">View all</CardLink>}>
      {boards.length ? (
        <ul className="divide-y divide-slate-100">
          {boards.slice(0, limit).map((board) => (
            <li key={board._id}>
              <Link to={`/boards?board=${board._id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                <span className={`h-3 w-3 shrink-0 rounded-[3px] ${boardColor(board._id)}`} />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{board.name}</span>
                {!board.canEdit && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Shared</span>
                )}
                <span className="text-xs text-slate-400">
                  {board.taskCount} task{board.taskCount === 1 ? "" : "s"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center px-6 py-8 text-center">
          <LuColumns2 size={22} className="text-slate-400" />
          <p className="mt-2 text-sm text-slate-500">No boards yet.</p>
          <Link to="/boards" className="mt-1 text-sm font-medium text-brand-600 hover:underline">
            Create a board
          </Link>
        </div>
      )}
    </Card>
  );
}

export default BoardsOverviewCard;
