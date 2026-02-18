import { HashRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Home } from "./pages/Home/Home"
import { TermList } from "./pages/TermList/TermList"
import { Study } from "./pages/Study/Study"

export const App = () => (
  <HashRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="terms" element={<TermList />} />
        <Route path="study" element={<Study />} />
      </Route>
    </Routes>
  </HashRouter>
)
