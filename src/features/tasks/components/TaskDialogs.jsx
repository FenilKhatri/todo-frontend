import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import TaskFormModal from "./TaskFormModal";

function TaskDialogs({ form, deleting, boards, onSave, onDelete, onCloseForm, onCloseDelete }) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteLoading(true);
    const deleted = await onDelete(deleting);
    setDeleteLoading(false);
    if (deleted !== false) onCloseDelete();
  };

  return (
    <>
      {form && (
        <TaskFormModal
          key={form.key}
          task={form.task}
          defaults={form.defaults}
          boards={boards}
          onSubmit={(values) => onSave(form.task, values)}
          onClose={onCloseForm}
        />
      )}

      <ConfirmModal
        open={Boolean(deleting)}
        title="Delete task"
        message={`"${deleting?.title}" will be permanently deleted.`}
        loading={deleteLoading}
        onConfirm={handleDelete}
        onClose={onCloseDelete}
      />
    </>
  );
}

export default TaskDialogs;
