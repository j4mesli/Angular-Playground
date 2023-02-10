import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {  }

  private userSubscription: Subscription;
  isAuthenticated = false;
  
  onSaveData = () => {
    this.dataStorageService.storeRecipes();
  }

  onFetchData = () => {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout = () => {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      // below just converts the falsey item twice to its inverse bool (null => true => false) for false, or ('foo' => false => true) for true 
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
