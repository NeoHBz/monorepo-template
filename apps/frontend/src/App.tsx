import { trpc } from "@apps/frontend/src/utils/trpc";

function App() {
  const hello = trpc.hello.useQuery();
  const users = trpc.getUsers.useQuery();

  return (
    <main className="container">
      <header className="header">
        <h1>Monorepo Boilerplate</h1>
        <p className="subtitle">Express • tRPC • React • Vite</p>
      </header>

      <section className="card">
        <h2>Backend Status</h2>
        <div className="status-indicator">
          <span className={`dot ${hello.isSuccess ? "online" : "offline"}`}></span>
          <span className="status-text">
            {hello.isLoading
              ? "Connecting..."
              : hello.error
                ? "Error"
                : hello.data?.message}
          </span>
        </div>
      </section>

      <section className="card">
        <h2>Users List</h2>
        {users.isLoading ? (
          <p>Loading users...</p>
        ) : users.error ? (
          <p className="error">Failed to load users</p>
        ) : (
          <ul className="user-list">
            {users.data?.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-avatar">{user.name[0]}</div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-id">ID: {user.id}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
