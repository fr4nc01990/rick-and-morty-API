import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

//OPCIÓN CREANDO UNA INTERFAZ
//interface MenuItem {
//  title: string;
//  route: string;
//}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public menuItems = routes
    .map((route) => route.children ?? []) //itera sobre lso childrens, si no existen crea un array vacío
    .flat() //aplana los subarrays (arrays anidados) que puedan haber
    .filter((route) => route && route.path) //filtra las rutas que tiene nun objeto válido y q tienen la propiedad path
    .filter((route) => !route.path?.includes(':')); //excluye rutas cuyo path incluye ":" indicativo de ruta dinamica.

  //CONSUMIENDO LA INTERFAZ Y USANDO SIGNALS
  //public menuItems = signal<MenuItem[]>([
  //  { title: 'Character', route: 'character' },
  //  { title: 'Episodes', route: 'episodes' },
  //  { title: 'Locations', route: 'locations' },
  //]);
}
