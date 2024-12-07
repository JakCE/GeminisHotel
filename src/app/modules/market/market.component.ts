import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent implements OnInit{
  productos: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    try {
      this.productos = await this.supabaseService.obtenerProductos();
      console.log(this.productos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }
}
