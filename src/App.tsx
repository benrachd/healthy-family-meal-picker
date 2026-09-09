import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppProvider } from './context/AppContext'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'
import { ResultsPage } from './pages/ResultsPage'
import { SavedPage } from './pages/SavedPage'
import { ShoppingListPage } from './pages/ShoppingListPage'
import { SearchPage } from './pages/SearchPage'
import { TimeSelectionPage } from './pages/TimeSelectionPage'

const routerBasename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={routerBasename}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/time/:category" element={<TimeSelectionPage />} />
            <Route path="/results/:category/:time" element={<ResultsPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/shopping" element={<ShoppingListPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}
