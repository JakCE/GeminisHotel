import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }

  private supabaseUrl = 'https://bgadighrpuipelcjsuvh.supabase.co'; // Reemplaza con tu URL
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYWRpZ2hycHVpcGVsY2pzdXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MzUxNzQsImV4cCI6MjA0OTExMTE3NH0.uIqAak4HcGw-9U4pAXhqNKH-35ndwM1_0ftgfP8yOXc'; // Reemplaza con tu clave
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  // Métodos CRUD
  async obtenerProductos() {
    const { data, error } = await this.supabase.from('productos').select('*');
    if (error) throw error;
    return data;
  }

  async agregarProducto(producto: { nombre: string; descripcion: string; precio: number }) {
    const { data, error } = await this.supabase.from('productos').insert([producto]);
    if (error) throw error;
    return data;
  }

  async registrarMovimiento(movimiento: {
    producto_id: number;
    tipo_movimiento: 'INGRESO' | 'SALIDA';
    cantidad: number;
  }) {
    const { data, error } = await this.supabase.from('movimientosInventario').insert([movimiento]);
    if (error) throw error;
    return data;
  }

  async obtenerInventario() {
    const { data, error } = await this.supabase
      .from('inventario')
      .select('id, producto_id, cantidad, Productos(nombre, precio)')
      .order('id');
    if (error) throw error;
    return data;
  }
}
