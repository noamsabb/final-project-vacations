import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout.tsx'
import './index.css'
import { vacationService } from './Services/VacationService.ts'

vacationService.getAllVacations();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
)
