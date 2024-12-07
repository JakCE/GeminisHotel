import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { ModalMarketComponent } from '../../components/modal-market/modal-market.component';
import { ModalEditMarketComponent } from '../../components/modal-edit-market/modal-edit-market.component';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [ModalMarketComponent, ModalEditMarketComponent],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent implements OnInit{
  productos: any[] = [];

  constructor(
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    // this.supabaseService.obtenerProductos().subscribe(data=>{
    //   this.productos = data.data;
    //   console.log(this.productos);
    // });
    this.supabaseService.obtenerInventario().subscribe(data=>{
      this.productos = data.data;
      console.log(this.productos);
    });
  }
}
