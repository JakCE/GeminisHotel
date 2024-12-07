import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { NgIf } from '@angular/common';

declare const initFlowbite: any; 

@Component({
  selector: 'app-modal-market',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-market.component.html',
  styleUrl: './modal-market.component.css'
})
export class ModalMarketComponent implements OnInit{
  addProductForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ){}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
  }

  insertProduct(){
    const req = {
      nombre: this.addProductForm.get("nombre")?.value,
      descripcion: this.addProductForm.get("descripcion")?.value,
      precio: this.addProductForm.get("precio")?.value,
      stockInicial: this.addProductForm.get("stock")?.value
    }
    this.supabaseService.registrarProductoConMovimiento(req).subscribe(data=>{
      console.log(data);
    })
  }
}
