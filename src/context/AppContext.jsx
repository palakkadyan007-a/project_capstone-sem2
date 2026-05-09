import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('sessions')
    return saved ? JSON.parse(saved) : []
  })

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addSession = (session) => {
    setSessions([...sessions, session])
  }

  return (
    <AppContext.Provider
      value={{ sessions, addSession, darkMode, setDarkMode }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)