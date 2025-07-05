import { Route, Routes } from 'react-router-dom'
import ConfigurationForm from './pages/ConfigurationForm'
import Home from './pages/Home'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/config' element={<ConfigurationForm />} />
    </Routes>
  )
}
