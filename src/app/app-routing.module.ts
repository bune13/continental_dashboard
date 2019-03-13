import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { AdminComponent } from "./auth/admin/admin.component";
import { AdminHomeComponent } from "./auth/admin/admin-home/admin-home.component";
import { AuthGuard } from "./shared/auth-guard.service";
import { LoggedOutComponent } from "./logged-out/logged-out.component";
import { AdminAgentMasterComponent } from "./auth/admin/admin-agent-master/admin-agent-master.component";
import { AdminDashboardComponent } from "./auth/admin/admin-dashboard/admin-dashboard.component";
import { AdminCallComponent } from "./auth/admin/admin-call/admin-call.component";
import { UnauthComponent } from "./unauth/unauth.component";


const appRouting:Routes = [
    {path:'', redirectTo:'signin', pathMatch: 'full'},
    {path:'signin', component: SigninComponent},
    {path:'signup', component: SignupComponent},
    // {path:'admin', canActivate:[AuthGuard], component: AdminComponent, children:[
    {path:'admin', component: AdminComponent, children:[
        {path:'', redirectTo:'home', pathMatch: 'full'},
        {path:'home', component: AdminHomeComponent},
        {path:'dashboard', component: AdminDashboardComponent},
        {path:'agentmaster', component: AdminAgentMasterComponent},
        {path:'call', component: AdminCallComponent},
    ],
        runGuardsAndResolvers: 'always'
    },
    {path:'unauth', component: UnauthComponent},
    {path:'loggedout', component: LoggedOutComponent},
    {path:'error-page', component: ErrorPageComponent, data:{message:'Page Not Found'}},
    {path:'**', redirectTo:'/error-page', pathMatch: 'full'},
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRouting, {useHash:true, onSameUrlNavigation: 'reload'}),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}