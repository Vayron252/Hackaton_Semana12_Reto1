//Creamos las cuentas de los usuarios
let cuentas = [
    {nombre: 'Mali', saldo: 200, dni: '58668985', password: 'helloworld' },
    {nombre: 'Gera', saldo: 290, dni: '74859655', password: 'l33t' },
    {nombre: 'Maui', saldo: 67, dni: '45789656', password: '123' },
    {nombre: 'Luis', saldo: 0, dni: '75956555', password: '1235' },
    {nombre: 'Marco', saldo: 280, dni: '77335566', password: '111' }
];
//Creamos un arreglo para los movimientos
let movimientos = [
    {dni: '58668985', monto: '$200.00', tipo: 'Depósito', fecha: '25/08/2023 08:05:00'},
    {dni: '74859655', monto: '$290.00', tipo: 'Depósito', fecha: '27/09/2023 11:50:23'},
    {dni: '45789656', monto: '$67.00', tipo: 'Depósito', fecha: '02/09/2023 13:52:00'},
    {dni: '77335566', monto: '$280.00', tipo: 'Depósito', fecha: '03/09/2023 15:39:23'}
];
//Creamos variable global
let usuarioLogueado = null;

//Inicializamos los controles
let btnIniciarSesion = document.querySelector('.login__iniciarsesion');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnOpcConsSaldo = document.querySelector('.opcion__consultasaldo');
let btnOpcDeposito = document.querySelector('.opcion__deposito');
let btnOpcRetiro = document.querySelector('.opcion__retiro');
let btnOpcMovimientos = document.querySelector('.opcion__movimientos');
let btnDepositar = document.getElementById('btnDepositar');
let btnRetirar = document.getElementById('btnRetirar');

//Funciones
const cambiarPantalla = (pnt_ocultar, pnt_mostrar) => {
    pnt_ocultar.classList.add('ocultar');
    pnt_mostrar.classList.remove('ocultar');
}

const mostrarMensaje = (elemento, mensaje) => {
    elemento.textContent = mensaje;
    elemento.classList.remove('ocultar');
    setTimeout(() => {
        elemento.classList.add('ocultar');
    }, 2000);
}

const iniciarSesion = () => {
    let nrodni = document.getElementById('txtNroDNI');
    let contrasenia = document.getElementById('txtContrasenia');

    if (nrodni.value == '' || contrasenia.value == '') {
        mostrarMensaje(document.querySelector('.login__mensaje'), 'Los campos dni o contraseña no pueden estar vacíos.');
        nrodni.value = '';
        contrasenia.value = '';
        nrodni.focus();
        return;
    }

    usuarioLogueado = cuentas.find((cuenta) => {
        return cuenta.dni == nrodni.value && cuenta.password == contrasenia.value;
    });

    if (usuarioLogueado == undefined) {
        mostrarMensaje(document.querySelector('.login__mensaje'), 'No se encontró el usuario con las credenciales ingresadas.');
        nrodni.value = '';
        contrasenia.value = '';
        nrodni.focus();
        return;
    }

    nrodni.value = '';
    contrasenia.value = '';
    cambiarPantalla(document.querySelector('.seccion__login'), document.querySelector('.seccion__menu'));
    mostrarMenuOpciones();
};

const cerrarSesion = () => {
    let posicion = cuentas.findIndex((cuenta) => {
        return cuenta.dni == usuarioLogueado.dni && cuenta.password == usuarioLogueado.password;
    });
    cuentas[posicion] = usuarioLogueado;
    usuarioLogueado = null;
    cambiarPantalla(document.querySelector('.seccion__menu'), document.querySelector('.seccion__login'));
    document.getElementById('txtNroDNI').focus();
}

const mostrarMenuOpciones = () => {
    let nombreUsuario = document.querySelector('.menu__nombreusuario');
    nombreUsuario.textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
}

const mostrarMenuConsSaldo = () => {
    let seccionConsSaldo = document.querySelector('.seccion__consultasaldo');
    cambiarPantalla(document.querySelector('.seccion__menu'), seccionConsSaldo);
    seccionConsSaldo.querySelector('.conssaldo_saldo').textContent = `$${usuarioLogueado.saldo}`;
}

const mostrarMenuDeposito = () => {
    cambiarPantalla(document.querySelector('.seccion__menu'), document.querySelector('.seccion__deposito'));
    let txtMontoDeposito = document.getElementById('txtMontoDeposito');
    txtMontoDeposito.value = '';
    document.querySelector('.deposito__saldo').textContent = '';
    txtMontoDeposito.focus();
}

const mostrarMenuRetiro = () => {
    cambiarPantalla(document.querySelector('.seccion__menu'), document.querySelector('.seccion__retiro'));
    let txtMontoRetiro = document.getElementById('txtMontoRetiro');
    txtMontoRetiro.value = '';
    document.querySelector('.retiro__saldo').textContent = '';
    txtMontoRetiro.focus();
}

const crearCelda = (contenido) => {
    let celda = document.createElement('td');
    celda.textContent = contenido;
    return celda;
}

const mostrarMenuMovimientos = () => {
    cambiarPantalla(document.querySelector('.seccion__menu'), document.querySelector('.seccion__movimientos'));
    //Seleccionamos los movimientos solamente de la cuenta del usuario logueado
    const listMovimientos = movimientos.filter((mov) => {
        return mov.dni == usuarioLogueado.dni;
    });
    let tabla = document.getElementById('tbl_movimientos');
    if (listMovimientos.length > 0) {
        document.querySelector('.movimientos__reporte').querySelector('p').classList.add('ocultar');
        //Creamos las filas para la tabla
        tabla.classList.remove('ocultar');
        let cuerpoTabla = tabla.querySelector('tbody');
        cuerpoTabla.innerHTML = '';
        listMovimientos.forEach(mov => {
            let fila = document.createElement('tr');
            fila.classList.add(mov.tipo=='Retiro'?'negativo':'positivo');
            fila.appendChild(crearCelda(mov.fecha));
            fila.appendChild(crearCelda(mov.monto));
            fila.appendChild(crearCelda(mov.tipo));
            cuerpoTabla.appendChild(fila);
        });
    } else {
        tabla.classList.add('ocultar');
        document.querySelector('.movimientos__reporte').querySelector('p').classList.remove('ocultar');
    }
}

const regresarMenu = (e) => {
    cambiarPantalla(e.parentNode.parentNode.parentNode, document.querySelector('.seccion__menu'));
}

const obtenerFechaHora = () => {
    const reloj = new Date();
    return reloj.getDate() + "/" + (reloj.getMonth() + 1).toString().padStart(2, '0') + "/" + reloj.getFullYear() + " " + reloj.toLocaleTimeString();
}

const realizarDeposito = () => {
    let txtMontoDeposito = document.getElementById('txtMontoDeposito');
    let montoDeposito = parseFloat(txtMontoDeposito.value).toFixed(2);
    let nuevoSaldo = parseFloat(usuarioLogueado.saldo) + parseFloat(montoDeposito);
    nuevoSaldo = parseFloat(nuevoSaldo).toFixed(2);
    if (nuevoSaldo > 990) {
        mostrarMensaje(document.querySelector('.deposito__mensaje'), 'Depósito excede al límite permitido en su cuenta.');
        return;
    }
    let Movimiento = {dni: usuarioLogueado.dni, monto: `$${montoDeposito}`, tipo: 'Depósito', fecha: obtenerFechaHora()};
    movimientos.push(Movimiento);
    usuarioLogueado.saldo = nuevoSaldo;
    document.querySelector('.deposito__saldo').textContent = `Saldo Actual $${nuevoSaldo}`;
}

const realizarRetiro = () => {
    let txtMontoRetiro = document.getElementById('txtMontoRetiro');
    let montoRetiro = parseFloat(txtMontoRetiro.value).toFixed(2);
    let nuevoSaldo = parseFloat(usuarioLogueado.saldo) - parseFloat(montoRetiro);
    nuevoSaldo = parseFloat(nuevoSaldo).toFixed(2);
    if (nuevoSaldo < 10) {
        mostrarMensaje(document.querySelector('.retiro__mensaje'), 'Retiro excede al límite permitido en su cuenta.');
        return;
    }
    let Movimiento = {dni: usuarioLogueado.dni, monto: `-$${montoRetiro}`, tipo: 'Retiro', fecha: obtenerFechaHora()};
    movimientos.push(Movimiento);
    usuarioLogueado.saldo = nuevoSaldo;
    document.querySelector('.retiro__saldo').textContent = `Saldo Actual $${nuevoSaldo}`;
}

//Eventos
btnIniciarSesion.addEventListener('click', () => {
    iniciarSesion();
});

btnCerrarSesion.addEventListener('click', () => {
    cerrarSesion();
});

btnOpcConsSaldo.addEventListener('click', () => {
    mostrarMenuConsSaldo();
});

btnOpcDeposito.addEventListener('click', () => {
    mostrarMenuDeposito();
});

btnOpcRetiro.addEventListener('click', () => {
    mostrarMenuRetiro();
});

btnOpcMovimientos.addEventListener('click', () => {
    mostrarMenuMovimientos();
});

btnDepositar.addEventListener('click', () => {
    realizarDeposito();
});

btnRetirar.addEventListener('click', () => {
    realizarRetiro();
});