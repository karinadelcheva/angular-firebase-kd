import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  it('should have a false value of userLoggedIn', () => {
    expect(authService.userLoggedIn).toBe(false);
  });

  it('should have a false value of allowSignUp', () => {
    expect(authService.allowSignUp).toBe(false);
  });

  //   it('should have an severity level of 423', () => {
  //     expect(authService.personalCodeSubscription).toBe(423);
  //   });

  it('creates an account', async () => {
    const result = 
      await authService.signUp("test@test.example", "password", "op", "opov");
    
    expect(result).toBeTruthy();
  });
});
