# Secure Angular Application

Este proyecto demuestra cómo crear una aplicación Angular segura con rutas protegidas y autenticación.

## Configuración del Proyecto
1. **Instalar Angular CLI:**
   ```sh
   npm install -g @angular/cli


Crear un nuevo proyecto:
    ng new secureApp
    cd secureApp

Generar los archivos necesarios:
    ng generate service services/auth
    ng generate guard guards/auth
    ng generate component components/public
    ng generate component components/protected


Servicio de Autenticación
Implementado en src/app/services/auth.service.ts para manejar el inicio de sesión y el estado de autenticación.

auth.service.ts
export class AuthService {
  private isAuthenticatedFlag = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'user' && password === 'password') {
      this.isAuthenticatedFlag = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  logout(): void {
    this.isAuthenticatedFlag = false;
    this.router.navigate(['/public']);
  }
}


Guardia de Autenticación
Implementado en src/app/guards/auth.guard.ts para proteger las rutas basadas en el estado de autenticación.

auth.guard.ts
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/public']);
      return false;
    }
  }
}


Configuración de Rutas
Configurado en src/app/app-routing.module.ts para definir rutas públicas y protegidas.

app-routing.module.ts
const routes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/public', pathMatch: 'full' },
  { path: '**', redirectTo: '/public' }
];


Navegación en el Componente Principal
El componente principal maneja la navegación y el estado de autenticación.

app.component.html
<nav>
  <a *ngIf="authService.isAuthenticated()" routerLink="/protected" routerLinkActive="active">Protected</a>
  <a *ngIf="authService.isAuthenticated()" (click)="logout()">Logout</a>
</nav>
<router-outlet></router-outlet>

app.component.ts
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}


Implementación del Formulario de Inicio de Sesión
El formulario de inicio de sesión permite a los usuarios autenticarse y acceder a rutas protegidas.

public.component.ts
export class PublicComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/protected']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }
    );
  }
}

public.component.html
<h1>Public Page</h1>
<p>This is a public page accessible to all users.</p>

<form (submit)="onSubmit()">
  <label for="username">Username:</label>
  <input type="text" id="username" [(ngModel)]="username" name="username" required>

  <label for="password">Password:</label>
  <input type="password" id="password" [(ngModel)]="password" name="password" required>

  <button type="submit">Login</button>
</form>
<p *ngIf="errorMessage">{{ errorMessage }}</p>



Uso
Iniciar el servidor:
    ng serve

Navegar a la aplicación:
Abre http://localhost:4200 en tu navegador.

Iniciar sesión:
Implementa un formulario de inicio de sesión en PublicComponent para establecer el token y navegar a rutas protegidas.

Cerrar sesión:
Utiliza el enlace de logout para cerrar la sesión y volver a la página pública.
