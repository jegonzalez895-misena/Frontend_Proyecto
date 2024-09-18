import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

categoria:any;
id_categoria: any;
obj_categoria = {
  codigo: "",
  nombre: ""
}

validar_codigo=true;
validar_nombre=true;
mform=false;
botones_form = false;

  constructor(private scate:CategoriaService){}

  ngOnInit(): void{
    this.consulta();
  }

  consulta(){
    this.scate.consultar().subscribe((resultado:any) => {
      this.categoria=resultado;
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
    this.obj_categoria= {
      codigo: "",
      nombre: "",      
    }
  }


  validar(funcion:any){
    if(this.obj_categoria.codigo == ""){
      this.validar_codigo=false;
    }else{
      this.validar_codigo=true
    }
    
    if(this.obj_categoria.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true
    }

    if(this.validar_codigo==true && this.validar_nombre==true && funcion == 'guardar'){
      this.guardar();
    }
    if(this.validar_codigo==true && this.validar_nombre==true && funcion == 'editar'){
      this.editar();
    }
  
  } 

guardar(){
  this.scate.insertar(this.obj_categoria).subscribe((datos:any) =>{
    if(datos['resultado']=='OK'){
      this.consulta();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nueva Categoría Guardada",
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
    title: "Esta Seguro De Eliminar La Categoría?",
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
      this.scate.eliminar(id).subscribe((datos:any) =>{
        if(datos['resultado']=='OK'){
          this.consulta();
        }
      })
      ///////////
      Swal.fire({
        title: "¡Categoría Eliminada!",
        text: "El Categoría Ha Sido Eliminada.",
        icon: "success"
      });
    }
  });     
}

cargar_datos(items: any, id: number){
  this.obj_categoria = {
    codigo: items.codigo,
    nombre: items.nombre
  }
  this.id_categoria = id;
  this.botones_form = true;
  this.mostrar_form('ver');
}

editar(){
  this.scate.editar(this.id_categoria, this.obj_categoria).subscribe((datos:any) => {
    if(datos['resultado'] == "OK") {
      this.consulta();
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Categoría Actualizada",
      showConfirmButton: false,
      timer: 1500
    });

  })
  this.limpiar();
  this.mostrar_form('no ver');
}

}