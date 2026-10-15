import SuccessPanel from "./SuccessPanel";

function SuccessModal(props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-emerald-50 to-white" />
        <SuccessPanel {...props} />
      </div>
    </div>
  );
}

export default SuccessModal;
