import { trpc } from "@/utils/trpc";

function App() {
  const hello = trpc.hello.useQuery();

  return (
    <main className="container">
      <header className="header">
        <h1>Monorepo Boilerplate</h1>
        <p className="subtitle">Express • tRPC • React • Vite</p>
      </header>

      <section className="card">
        <h2>Backend Status</h2>
        <div className="status-indicator">
          <span
            className={`dot ${hello.isSuccess ? "online" : "offline"}`}
          ></span>
          <span className="status-text">
            {hello.isLoading
              ? "Connecting"
              : hello.error
                ? "Error"
                : hello.data?.message}
          </span>
        </div>
      </section>

      <section className="card">
        <h2>Users List</h2>
        Ping payload string: {hello.data?.message}
      </section>
    </main>
  );
}

export default App;
