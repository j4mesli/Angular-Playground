import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactorResolver: ComponentFactoryResolver,
  ) {  }

  isLoginMode = true;
  isLoading = false;
  error: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeErrorMessage: Subscription;

  onSwitchMode = () => {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit = (form: NgForm) => {
    if (!form.valid) return;
    this.error = null;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;
    
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signup(email, password);
    }

    // store the observable down here instead of up top
    authObs.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
        this.showErrorAlert(err.message);
        this.isLoading = false;
      },
      complete: () => {
        console.info(this.isLoginMode ? 'log in complete' : 'sign up complete');
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
    });

    // clears form on submit
    form.reset();
  }

  onHandleError = () => {
    this.error = null;
  }

  private showErrorAlert = (errMessage: string) => {
    // const alertComponent = new AlertComponent();

    // below is how to programatically create and delete the alert component
    const alertCmpFactory = this.componentFactorResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = errMessage;
    this.closeErrorMessage = componentRef.instance.close.subscribe(
      () => {
        this.closeErrorMessage.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.closeErrorMessage) 
      this.closeErrorMessage.unsubscribe();
  }
}
