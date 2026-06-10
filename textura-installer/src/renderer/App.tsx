import InstallerScreen from './components/InstallerScreen'

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-title">Textura Installer</span>
        <span className="app-badge">spike / reference architecture</span>
      </header>
      <main className="app-main">
        <InstallerScreen />
      </main>
    </div>
  )
}