import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
// below ROUTE GUARD RUNS METHOD AND LOGIC BEFORE ROUTE LOADS AND DENIES/ACCEPTS BASED ON SUCH LOGIC
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // allows access if there is a defined user object with proper authentication
    // and if there isn't, then user is denied and redirected to particular route
    return this.authService.user.pipe(
      // ADD TAKE TO ENSURE THAT THERE ISN'T AN ONGOING LISTENER, OR ELSE MEMORY LEAK IN SITE AND BROKEN USER AUTH
      take(1),
      map(user => { 
        const isAuthenticated = !!user;
        if (isAuthenticated) return true;
        // redirects the user to the "/auth" page if their user object is not authenticated
        else return this.router.createUrlTree(['/auth']);
      }),
      // below does exactly as outlined above without URLTree
      // tap(isAuthenticated => { if (!isAuthenticated) this.router.navigate(['/auth']) }),
    );
  }
  
}
