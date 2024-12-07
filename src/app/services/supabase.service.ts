import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  constructor() { }
  private supabaseUrl = 'https://bgadighrpuipelcjsuvh.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYWRpZ2hycHVpcGVsY2pzdXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MzUxNzQsImV4cCI6MjA0OTExMTE3NH0.uIqAak4HcGw-9U4pAXhqNKH-35ndwM1_0ftgfP8yOXc'; // Reemplaza con tu clave
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  obtenerProductos(): Observable<any> {
    return from(this.supabase.from('productos').select('*'));
  }

  registrarProductoConMovimiento(producto: {
    nombre: string;
    descripcion: string;
    precio: number;
    stockInicial: number;
  }): Observable<any> {
    // Paso 1: Registrar el producto
    const productoObservable = from(
      this.supabase
        .from('productos')
        .insert([{ nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio }])
        .select('id')
        .single()
    );

    // Paso 2: Registrar el movimiento de inventario
    return productoObservable.pipe(
      switchMap((response: any) => {
        if (response.error) throw response.error;

        const productoId = response.data.id;
        const movimiento = {
          producto_id: productoId,
          tipo_movimiento: 'INGRESO',
          cantidad: producto.stockInicial,
        };

        return from(this.supabase.from('movimientosinventario').insert([movimiento])).pipe(
          map((movimientoResponse: any) => {
            if (movimientoResponse.error) throw movimientoResponse.error;
            return {
              producto: response.data,
              movimiento: movimientoResponse.data,
            };
          })
        );
      })
    );
  }
  
  agregarProducto(producto: { nombre: string; descripcion: string; precio: number }): Observable<any> {
    return from(this.supabase.from('productos').insert([producto]));
  }

  // agregarInventario(inv: any): Observable<any>{
  //   return from(this.supabase.from('inventario').insert([inv]))
  // }

  registrarMovimiento(movimiento: {
    producto_id: number;
    tipo_movimiento: 'INGRESO' | 'SALIDA';
    cantidad: number;
  }): Observable<any> {
    return from(this.supabase.from('movimientosinventario').insert([movimiento]));
  }

  editarProducto(productoId: number, datosActualizados: { nombre?: string; descripcion?: string; precio?: number }): Observable<any> {
    return from(
      this.supabase
        .from('productos')
        .update(datosActualizados)
        .eq('id', productoId)
    );
  }

  obtenerInventario(): Observable<any> {
    return from(
      this.supabase
        .from('inventario')
        .select('id, producto_id, cantidad, productos(nombre, descripcion, precio)')
        .order('id')
    );
  }
  // // Métodos CRUD
  // async obtenerProductos() {
  //   const { data, error } = await this.supabase.from('productos').select('*');
  //   if (error) throw error;
  //   return data;
  // }

  // async agregarProducto(producto: { nombre: string; descripcion: string; precio: number }) {
  //   const { data, error } = await this.supabase.from('productos').insert([producto]);
  //   if (error) throw error;
  //   return data;
  // }

  // async registrarMovimiento(movimiento: {
  //   producto_id: number;
  //   tipo_movimiento: 'INGRESO' | 'SALIDA';
  //   cantidad: number;
  // }) {
  //   const { data, error } = await this.supabase.from('movimientosInventario').insert([movimiento]);
  //   if (error) throw error;
  //   return data;
  // }

  // async obtenerInventario() {
  //   const { data, error } = await this.supabase
  //     .from('inventario')
  //     .select('id, producto_id, cantidad, Productos(nombre, precio)')
  //     .order('id');
  //   if (error) throw error;
  //   return data;
  // }
}
