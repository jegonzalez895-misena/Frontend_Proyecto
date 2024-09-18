import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrls: ['./pedidoinsertar.component.scss']
})
export class PedidoinsertarComponent {

  productos:any;
  cliente:any;
  ident_cliente = "";
  nombre_cliente = "";
  matriz_producto:any = [];
  arreglo_productos: any = [];  
  total: any= 0;
  pedido = {
    fecha:"",
    fo_cliente:0,
    productos: [],
    subtotal:0,    
    total:0,
    fo_usuario:0
  }

  constructor(private router:Router, private sproductos: ProductoService, private scliente: ClienteService, private spedido:PedidoService){}

  ngOnInit(): void{
    this.consulta_productos();

  }

  consulta_productos(){
    this.sproductos.consultar().subscribe((result:any)=>{
      this.productos=result;
    })
  }

  consulta_cliente(){
    this.scliente.ccliente(this.ident_cliente).subscribe((result:any)=>{
      this.cliente=result;
      this.nombre_cliente = this.cliente[0].nombre;
      console.log(this.cliente);
    })
  }

  seleccionar(valores:any, id:number){
    let cantidad = Number(prompt("Ingrese La Cantidad a Vender"));
    this.arreglo_productos = [valores.codigo, valores.nombre, Number(valores.valor_venta), cantidad, cantidad * Number(valores.valor_venta)];
    this.matriz_producto.push(this.arreglo_productos);

    let largo = this.matriz_producto.length;
    this.total = 0;
    for(let i=0; i<largo; i++){
      this.total = this.total + this.matriz_producto[i][4];
    }    

  }

  guardar(){
    //console.log(this.matriz_producto);

    let fecha = new Date();
    this.pedido.fecha = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.fo_cliente = Number(this.cliente[0].id_cliente);
    this.pedido.productos = this.matriz_producto;
    this.pedido.subtotal = this.total;
    this.pedido.total = this.total;     
    this.pedido.fo_usuario = Number(sessionStorage.getItem('id'));
    //console.log(this.pedido);

    this.spedido.insertar(this.pedido).subscribe((datos:any) =>{
      if(datos['resultado']=='OK'){
        console.log(datos['resultado']);
        this.router.navigate(['pedido']);
      }
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Pedido Procesado",
      showConfirmButton: false,
      timer: 1500
    });

  }


}
