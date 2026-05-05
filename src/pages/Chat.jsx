import ChatPanel from "../components/ChatPanel";

export default function Chat() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 md:px-8" style={{ height: "calc(100vh - 57px)" }}>
      <div className="flex-1 min-h-0 rounded-2xl border border-bg-line bg-bg-soft my-4 overflow-hidden">
        <ChatPanel />
      </div>
    </div>
  );
}
