import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CategoryComponent } from "./category.component";

import RouteNames from "src/app/core/helpers/route-names.helper";

const routes:Routes = [
    {
        path:'',
        component:CategoryComponent,
        children:[
            {
                path:RouteNames.ALL_CATEGORIES,
                loadChildren:() => import('./all-categories/all-categories.module')
                .then(m => m.AllCategoriesModule),
            },
            {
                path:RouteNames.REQUESTED_CATEGORIES,
                loadChildren:() => import('./requested-categories/requested-categories.module')
                .then(m => m.RequestedCategoriesModule),
            },
            {
                path:'',
                redirectTo:RouteNames.ALL_CATEGORIES,
                pathMatch:'full',
            },
        ],
    },
];

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    declarations:[
        CategoryComponent,
    ],
    exports:[RouterModule],
})
export class CategoryRoutingModule {}