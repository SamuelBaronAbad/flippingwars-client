import LayoutBasic from './../layouts/LayoutBasic';
import MainHome from '../pages/main';
import MainSignIn from '../pages/main/SignIn';

const routes = [
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
                path:"/login",
                componente: MainSignIn,
                exact: true
            }
        ]
    }
]

export default routes;
