import Home from "@/pages/Home";
import StudyPlan from "@/pages/StudyPlan";
import Teachers from "@/pages/Teachers";
import Us from "@/pages/Us";

export const PAGES = [
    {
        path: '/',
        component: Home,
        label: 'Inicio'
    },
    {
        path: '/us',
        component: Us,
        label: 'Nosotros'
    },
    {
        path: '/study-plan',
        component: StudyPlan,
        label: 'Plan de Estudio'
    },
    {
        path: '/teachers',
        component: Teachers,
        label: 'Docentes'
    }
]