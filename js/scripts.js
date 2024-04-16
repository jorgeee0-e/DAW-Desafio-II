function mes(){
    var meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    var  ahora = new Date();
    var mes = ahora.getMonth();
    return meses[mes];

}

document.addEventListener('DOMContentLoaded',() =>{
    var h1mes = document.getElementById("header-mes");
    var esteMes =  mes();
/*     console.log(esteMes);*/
    h1mes.textContent ='Presupuesto de '+ esteMes + ' '+ new Date().getFullYear();    
})

