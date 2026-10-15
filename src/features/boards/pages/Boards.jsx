import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiColumns, FiPlus } from "react-icons/fi";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import ConfirmModal from "../../../components/ConfirmModal";
import EmptyState from "../../../components/EmptyState";
import Loader from "../../../components/Loader";
import PageHeader from "../../../components/PageHeader";
import { getErrorMessage } from "../../../shared/lib/axios";
import { deleteTask, saveTask, toggleTask } from "../../tasks/task.api";
import { groupTasks } from "../../tasks/task.utils";
import TaskBoardView from "../../tasks/components/TaskBoardView";
import TaskFormModal from "../../tasks/components/TaskFormModal";
import { createBoard, deleteBoard, getBoard, getBoards, leaveBoard, updateBoard } from "../board.api";
import BoardDetailsCard from "../components/BoardDetailsCard";
import BoardFormModal from "../components/BoardFormModal";
import BoardSwitcher from "../components/BoardSwitcher";
import ShareBoardModal from "../components/ShareBoardModal";

const confirmCopy = (confirm, board) => {
  if (confirm?.type === "task") {
    return {
      title: "Delete task",
      message: `"${confirm.task.title}" will be permanently deleted.`,
      label: "Delete",
    };
  }
  if (board?.canEdit) {
    return {
      title: "Delete board",
      message: `"${board.name}" will be deleted. Its tasks are kept and moved to General.`,
      label: "Delete",
    };
  }
  return { title: "Leave board", message: `You will lose access to "${board?.name}".`, label: "Leave" };
};

function Boards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [boardForm, setBoardForm] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [taskForm, setTaskForm] = useState(null);

  const selectedId = searchParams.get("board") || boards[0]?._id;

  const loadBoards = useCallback(async () => {
    const list = await getBoards();
    setBoards(list);
    return list;
  }, []);

  const loadBoard = useCallback(async (boardId) => {
    setBoard(boardId ? await getBoard(boardId) : null);
  }, []);

  useEffect(() => {
    getBoards()
      .then(setBoards)
      .catch((err) => setError(getErrorMessage(err, "Unable to load boards")))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    let ignore = false;
    getBoard(selectedId)
      .then((detail) => !ignore && setBoard(detail))
      .catch((err) => !ignore && setError(getErrorMessage(err, "Unable to load board")));
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  const selectBoard = (boardId) => setSearchParams(boardId ? { board: boardId } : {});

  // Refresh the open board and the list (task counts, names) after any change.
  const refresh = useCallback(async () => {
    await Promise.all([loadBoards(), loadBoard(selectedId)]);
  }, [loadBoards, loadBoard, selectedId]);

  const groups = useMemo(() => groupTasks(board?.tasks || []), [board]);
  const ownedBoards = useMemo(() => boards.filter((item) => item.canEdit), [boards]);

  const handleBoardSave = async (values) => {
    if (boardForm.board) {
      await updateBoard(boardForm.board._id, values);
      await refresh();
    } else {
      const created = await createBoard(values);
      await loadBoards();
      selectBoard(created._id);
    }
  };

  const handleConfirm = async () => {
    setConfirmLoading(true);
    try {
      if (confirm.type === "board") {
        await (board.canEdit ? deleteBoard(board._id) : leaveBoard(board._id));
        const list = await loadBoards();
        selectBoard(list[0]?._id);
      } else {
        await deleteTask(confirm.task._id);
        await refresh();
      }
      setConfirm(null);
    } catch (err) {
      setError(getErrorMessage(err, "Action failed"));
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleTaskSave = async (values) => {
    await saveTask(taskForm.task, values);
    await refresh();
  };

  const setTaskStatus = (taskId, status) =>
    setBoard((current) => ({
      ...current,
      tasks: current.tasks.map((item) => (item._id === taskId ? { ...item, status } : item)),
    }));

  const handleToggle = async (task) => {
    // Move the task immediately; roll back if the server rejects it.
    setTaskStatus(task._id, task.status === "completed" ? "todo" : "completed");
    try {
      await toggleTask(task);
    } catch (err) {
      setTaskStatus(task._id, task.status);
      setError(getErrorMessage(err, "Unable to update task"));
    }
  };

  const openNewBoard = () => setBoardForm({ key: Date.now(), board: null });

  if (loading) return <Loader label="Loading boards..." />;

  const copy = confirmCopy(confirm, board);

  return (
    <div>
      <PageHeader
        title="Boards"
        subtitle="Group tasks and share a board as view-only."
        actions={
          <Button onClick={openNewBoard}>
            <FiPlus /> New board
          </Button>
        }
      />

      <Alert onDismiss={() => setError("")} className="mt-4">
        {error}
      </Alert>

      {boards.length === 0 ? (
        <EmptyState
          icon={FiColumns}
          title="No boards yet"
          description="Create a board to group related tasks, then share it with teammates as view-only."
          action={
            <Button onClick={openNewBoard}>
              <FiPlus /> Create your first board
            </Button>
          }
          className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white"
        />
      ) : (
        <>
          <BoardSwitcher boards={boards} selectedId={selectedId} onSelect={selectBoard} />

          {!board || board._id !== selectedId ? (
            <Loader label="Loading board..." />
          ) : (
            <>
              <BoardDetailsCard
                board={board}
                onShare={() => setSharing(true)}
                onEdit={() => setBoardForm({ key: Date.now(), board })}
                onDelete={() => setConfirm({ type: "board" })}
                onLeave={() => setConfirm({ type: "board" })}
              />
              <TaskBoardView
                groups={groups}
                readOnly={!board.canEdit}
                className="mt-6"
                onAdd={(column) =>
                  setTaskForm({
                    key: Date.now(),
                    task: null,
                    defaults: { boardId: board._id, status: column === "completed" ? "completed" : "todo" },
                  })
                }
                onToggle={handleToggle}
                onEdit={(task) => setTaskForm({ key: Date.now(), task })}
                onDelete={(task) => setConfirm({ type: "task", task })}
              />
            </>
          )}
        </>
      )}

      {boardForm && (
        <BoardFormModal
          key={boardForm.key}
          board={boardForm.board}
          onSubmit={handleBoardSave}
          onClose={() => setBoardForm(null)}
        />
      )}

      {sharing && board && (
        <ShareBoardModal
          board={board}
          onUpdated={(updated) => setBoard((current) => ({ ...current, members: updated.members }))}
          onClose={() => {
            setSharing(false);
            loadBoards();
          }}
        />
      )}

      {taskForm && (
        <TaskFormModal
          key={taskForm.key}
          task={taskForm.task}
          defaults={taskForm.defaults}
          boards={ownedBoards}
          onSubmit={handleTaskSave}
          onClose={() => setTaskForm(null)}
        />
      )}

      <ConfirmModal
        open={Boolean(confirm)}
        title={copy.title}
        message={copy.message}
        confirmLabel={copy.label}
        loading={confirmLoading}
        onConfirm={handleConfirm}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}

export default Boards;
