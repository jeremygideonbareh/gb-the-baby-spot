import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/nunito/wght.css'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build pre-renders the page into index.html; hydrate it when present.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)

// Let the clothesline finish its swing, then hand over to the page.
requestAnimationFrame(() => {
  const wait = Math.max(0, 1150 - performance.now())
  setTimeout(() => document.documentElement.classList.add('app-ready'), wait)
})
