let saldo = 0;
let transacciones = [];

transacciones = [
    { tipo: 'Ingresos', descripcion: 'Venta de producto', monto: 100 },
    { tipo: 'Ingresos', descripcion: 'Servicio prestado', monto: 150 },
    { tipo: 'Egresos', descripcion: 'Pago de agua', monto: -150 },
    { tipo: 'Egresos', descripcion: 'Pago de luz', monto: -25 }
];

const total_transactions=(transacciones) =>{
    let total = 0;
    var totalStr;
    transacciones.forEach(element => {
        total += element.monto; 
    });

    if (total > 0) {
        totalStr = "+ "+total.toFixed(2);
        return totalStr;
    } if (total == 0) {
        totalStr = total.toFixed(2);
        return totalStr;
    } else {
        totalStr = "("+total.toFixed(2)+")";
        return totalStr;
    }

    
}

const ingresos = (transacciones)=>{
    const in_transacciones = transacciones.filter(transaccion =>transaccion.tipo === "Ingresos"); 
    let ingreso_total =0;


    in_transacciones.forEach(element => {
        ingreso_total += element.monto; 

    });
    return ingreso_total;

}

const egresos = (transacciones)=>{
    const in_transacciones = transacciones.filter(transaccion =>transaccion.tipo === "Egresos"); 
    let egreso_total =0;

    in_transacciones.forEach(element => {
        egreso_total += element.monto; 

    });
    

    return egreso_total;

}
const percent_gastos = (transaccion)=>{
    let percent = 0;
    let money_in = 0;
    let money_out = 0;
    money_in = ingresos(transaccion);
    money_out = egresos(transaccion);
    percent = (money_out/money_in)*100;
    return percent;
}

  


const nuevaTransaccion = (event)=>{
    event.preventDefault();
var tipoTransaction = document.getElementById("option").value;
tipoTransaction =tipoTransaction.charAt(0).toUpperCase()+tipoTransaction.slice(1);
var descripcion = document.getElementById("descripcion").value;
var monto = parseFloat(document.getElementById("monto").value);
if (tipoTransaction =="Egresos") {
    monto = -monto;
};

addTransaction(tipoTransaction,descripcion,monto);

localStorage.setItem('transacciones', JSON.stringify(transacciones));
showTransactions(transacciones);
    addTo(transacciones);
    label_refrsh(transacciones);
}

const label_refrsh = (transacciones) =>{
    var saldo_element = document.getElementById("saldo");
    saldo_element.textContent = total_transactions(transacciones);
    var ingresos_element = document.getElementById("ingresos");
    ingresos_element.textContent ="+"+ ingresos(transacciones).toFixed(2);
    var egresos_element = document.getElementById("egresos");
    egresos_element.textContent = egresos(transacciones).toFixed(2);
    var porcentajes= document.getElementById("porcentaje");
    porcentajes.textContent = Math.abs(percent_gastos(transacciones).toFixed(0))+"%";
}


const change_btn =()=>{

    const btnIngresos = document.getElementById("btn-ingresos");
    const btnEgresos = document.getElementById("btn-egresos");

    btnIngresos.addEventListener('click', ()=> {
        btnIngresos.classList.remove("box-gray");
        btnIngresos.classList.add("box-negative","active");
        btnEgresos.classList.remove("box-negative","active");
        btnEgresos.classList.add("box-gray");
        addTo(transacciones);
        
    })
    
    btnEgresos.addEventListener('click', ()=>{
        btnEgresos.classList.remove("box-gray");
        btnEgresos.classList.add("box-negative","active");
        btnIngresos.classList.remove("box-negative","active");
        btnIngresos.classList.add("box-gray");
        addTo(transacciones);
        
    })
}
 document.addEventListener('DOMContentLoaded',()=>{

    change_btn();
    label_refrsh(transacciones);
    addTo(transacciones);
    
 });


const showTransactions = (transacciones)=>{
    transacciones.forEach(transaction => {
        console.log(`Tipo: ${transaction.tipo}, Descripción: ${transaction.descripcion}, Monto: ${transaction.monto}`);
    });

    clear();
}


const addTransaction = (tipo, descripcion, monto) =>{
    let newtransaction = {
        tipo: tipo,
        descripcion: descripcion,
        monto: monto,
    };
    transacciones.push(newtransaction);
}

document.addEventListener('DOMContentLoaded',()=>{ 

   
        document.getElementById("btn-add").addEventListener("click",(event)=>{
            var tipoTransaction = document.getElementById("option").value;
            var descripcion = document.getElementById("descripcion").value;
            var monto = parseFloat(document.getElementById("monto").value.trim());
            if (tipoTransaction ==''|| descripcion == ''|| isNaN(monto)) {
                alert("Por favor complete todos los campos solicitados")
            } else {
            nuevaTransaccion(event);}
        });
    
    
})


const addTo = (transacciones) =>{
    const container_transacctions = document.querySelector(".container-cantidad");
    const btnIngresos = document.getElementById('btn-ingresos');
    container_transacctions.innerHTML="";
    let transacciones_filtered = [];

    if (btnIngresos.classList.contains("active")) {
       transacciones_filtered =  transacciones.filter( transaccion =>transaccion.tipo === "Ingresos");
        
    } else {
        transacciones_filtered =  transacciones.filter( transaccion =>transaccion.tipo === "Egresos");
        
    }


    transacciones_filtered.forEach(transaccion => {
        const nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("cantidad","box-positive-2"); //agrega las clases al div
       
        const parrafo1=document.createElement("p");
        const parrafo2=document.createElement("p");
       
        parrafo1.textContent = transaccion.descripcion;
        parrafo2.textContent = transaccion.monto.toFixed(2);
       
        nuevoDiv.appendChild(parrafo1);
        nuevoDiv.appendChild(parrafo2);

        container_transacctions.appendChild(nuevoDiv);
    });
}

const clear = ()=>{
    var tipoTransaction = document.getElementById("option").value="";
    var descripcion = document.getElementById("descripcion").value="";
    var monto = document.getElementById("monto").value="";
}
