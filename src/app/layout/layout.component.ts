import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../shared/components/side-menu/side-menu.component';


@Component({
  standalone: true,
  imports: [RouterModule, SideMenuComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {

}
