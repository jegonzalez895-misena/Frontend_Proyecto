import { Component } from '@angular/core';
import { CaracteristicasService } from 'src/app/servicios/caracteristicas.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  producto:any;
  categoria:any;
  proveedor:any;
  id_producto:any;


  obj_producto={
    codigo:"",
    nombre:"",
    fo_categoria: 0,
    inventario: 0,
    valor_compra:0,
    valor_venta:0,
    fo_proveedor:0,
    marca:"",
    presentacion:""
  }

  validar_codigo=true;
  validar_nombre=true;
  validar_categoria=true;
  validar_inventario=true;
  validar_vcompra=true;
  validar_vventa=true;
  validar_proveedor=true;
  validar_marca=true;
  validar_presentacion=true;
  mform=false;
  botones_form=false;

  

  constructor(private sproducto:ProductoService, private scate:CategoriaService, private sprov:ProveedorService) {}

  ngOnInit(): void{
    this.consulta();
    this.consulta_c();
    this.consulta_d();
  }

  consulta(){
    this.sproducto.consultar().subscribe((resultado:any) => {
      this.producto=resultado;
    })
  }

  consulta_c(){
    this.scate.consultar().subscribe((resultado:any) => {
      this.categoria=resultado;
    })
  }

  consulta_d(){
    this.sprov.consultar().subscribe((resultado:any) => {
      this.proveedor=resultado;
    })
  }

  mostrar_form(dato:any){
    switch(dato){
      case "ver":
        this.mform = true;
        break;
        case "no ver":
          this.mform = false;
          this.botones_form = false;
        break;
    }
  }

  limpiar(){

    this.obj_producto={
      codigo:"",
      nombre:"",
      fo_categoria: 0,
      inventario: 0,
      valor_compra:0,
      valor_venta:0,
      fo_proveedor:0,
      marca:"",
      presentacion:""
    }
  }

  validar(funcion: any){
    if(this.obj_producto.codigo == ""){
      this.validar_codigo=false;
    }else{
      this.validar_codigo=true;
    }

    if(this.obj_producto.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.obj_producto.fo_categoria == 0){
      this.validar_categoria=false;
    }else{
      this.validar_categoria=true;
    }

    if(this.obj_producto.inventario == 0){
      this.validar_inventario=false;
    }else{
      this.validar_inventario=true;
    }

    if(this.obj_producto.valor_compra == 0){
      this.validar_vcompra=false;
    }else{
      this.validar_vcompra=true;
    }

    if(this.obj_producto.valor_venta == 0){
      this.validar_vventa=false;
    }else{
      this.validar_vventa=true;
    }

    if(this.obj_producto.fo_proveedor == 0){
      this.validar_proveedor=false;
    }else{
      this.validar_proveedor=true;
    }

    if(this.obj_producto.marca == ""){
      this.validar_marca=false;
    }else{
      this.validar_marca=true;
    }

    if(this.obj_producto.presentacion == ""){
      this.validar_presentacion=false;
    }else{
      this.validar_presentacion=true;
    } 
    
    if(this.validar_codigo==true && this.validar_nombre==true && this.validar_categoria==true && this.validar_inventario==true && this.validar_vcompra==true 
      && this.validar_vventa==true && this.validar_proveedor==true && this.validar_marca==true && this.validar_presentacion==true && funcion == 'guardar'){
        this.guardar();
    }
    if(this.validar_codigo==true && this.validar_nombre==true && this.validar_categoria==true && this.validar_inventario==true && this.validar_vcompra==true 
      && this.validar_vventa==true && this.validar_proveedor==true && this.validar_marca==true && this.validar_presentacion==true && funcion == 'editar'){
        this.editar();
    }
}


guardar(){
  this.sproducto.insertar(this.obj_producto).subscribe((datos:any) =>{
    if(datos['resultado']=='OK'){
      this.consulta();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nuevo Producto Guardado",
        showConfirmButton: false,
        timer: 1500
      })  
    }
  });

  this.limpiar();
  this.mostrar_form('no ver');
}

eliminar(id:number){

  Swal.fire({
    title: "Esta Seguro De Eliminar El Productro?",
    text: "El Proceso NO Podra Ser Revertido!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      ///////////
      this.sproducto.eliminar(id).subscribe((datos:any) =>{
        if(datos['resultado']=='OK'){
          this.consulta();
        }
      })
      ///////////
      Swal.fire({
        title: "¡Producto Eliminado!",
        text: "El Producto Ha Sido Eliminado.",
        icon: "success"
      });
    }
  });     
}

cargar_datos(items:any, id: number){

  this.obj_producto={
    codigo: items.codigo,
    nombre: items.nombre,
    fo_categoria: items.fo_categoria,
    inventario: items.inventario,
    valor_compra: items.valor_compra,
    valor_venta: items.valor_venta,
    fo_proveedor: items.fo_proveedor,
    marca: items.marca,
    presentacion: items.presentacion
  }

  this.id_producto=id;

  this.botones_form = true;
  this.mostrar_form('ver');

}

editar(){
  this.sproducto.editar(this.id_producto, this.obj_producto).subscribe((datos:any) => {
    if(datos['resultado'] == "OK") {
      this.consulta();
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Producto Actualizado",
      showConfirmButton: false,
      timer: 1500
    });
  })
  this.limpiar();
  this.mostrar_form('no ver');
}
  
}
  
  

