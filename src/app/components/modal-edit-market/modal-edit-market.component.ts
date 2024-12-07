import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';

declare const initFlowbite: any; 

@Component({
  selector: 'app-modal-edit-market',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-edit-market.component.html',
  styleUrl: './modal-edit-market.component.css'
})
export class ModalEditMarketComponent implements OnInit {
  editProductForm!: FormGroup;
  @Input() dataToEdit: any = {};

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ){}

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    });
    if (typeof initFlowbite === 'function') {
      initFlowbite();
    }
    this.assignData();
    // console.log(this.dataToEdit);
  }

  assignData(){
    this.editProductForm.get("nombre")?.setValue(this.dataToEdit.productos.nombre);
    this.editProductForm.get("descripcion")?.setValue(this.dataToEdit.productos.descripcion);
    this.editProductForm.get("precio")?.setValue(this.dataToEdit.productos.precio);
  }

  editForm(){
    const req = {
      nombre: this.editProductForm.get("nombre")?.value,
      descripcion: this.editProductForm.get("descripcion")?.value,
      precio: this.editProductForm.get("precio")?.value
    }
    this.supabaseService.editarProducto(this.dataToEdit.producto_id, req).subscribe(data=>{
      console.log(data);
    })
  }
}
