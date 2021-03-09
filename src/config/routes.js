import LayoutBasic from './../layouts/LayoutBasic';
import MainHome from '../pages/Main';
import AdminHome from '../pages/Admin';
import LayoutAdmin from '../layouts/LayoutAdmin';
import Games from '../pages/games';
import FlipCards from '../pages/games/FlipCards';
import ApiFC from '../pages/games/FlipCards/ApiGame';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
        ]  
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: MainHome,
                exact: true
            },
            {
                path:"/games",
                component: Games,
                exact: true
            },
            {
                path:"/games/flip-cards",
                component: FlipCards,
                exact: true
            },
            {
                path:"/games/flip-cards/apiFC",
                component: ApiFC,
                exact: true
            }
        ]
    }
    
]

export default routes;
