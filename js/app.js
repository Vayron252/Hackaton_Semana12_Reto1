//Creamos las cuentas de los usuarios
let cuentas = [
    {nombre: 'Mali', saldo: 200, dni: '58668985', password: 'helloworld' },
    {nombre: 'Gera', saldo: 290, dni: '74859655', password: 'l33t' },
    {nombre: 'Maui', saldo: 67, dni: '45789656', password: '123' },
    {nombre: 'Marco', saldo: 280, dni: '77335566', password: '11' }
];
//Creamos un arreglo para los movimientos
let movimientos = [
    {dni: '77335566', monto: 20, tipo: 'D', fecha: '25/08/2023 08:05:00'},
    {dni: '77335566', monto: 40, tipo: 'R', fecha: '28/09/2023 10:50:23'}
]
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

const mostrarMenuMovimientos = () => {
    cambiarPantalla(document.querySelector('.seccion__menu'), document.querySelector('.seccion__movimientos'));
    //Seleccionamos los movimientos solamente de la cuenta del usuario logueado
    const listMovimientos = movimientos.filter((mov) => {
        return mov.dni == usuarioLogueado.dni;
    });
    //Creamos las filas para la tabla
    let tabla = document.getElementById('tbl_movimientos');
    listMovimientos.forEach(mov => {
        let fila = document.createElement('tr');
        let celda1 = document.createElement('td');
        celda.textContent = mov.fecha;
        let celda2 = document.createElement('td');
        celda.textContent = mov.monto;
        let celda3 = document.createElement('td');
        celda.textContent = mov.tipo;
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
    });
}

const regresarMenu = (e) => {
    cambiarPantalla(e.parentNode.parentNode.parentNode, document.querySelector('.seccion__menu'));
}

const realizarDeposito = () => {
    let txtMontoDeposito = document.getElementById('txtMontoDeposito');
    let nuevoSaldo = parseFloat(usuarioLogueado.saldo) + parseFloat(txtMontoDeposito.value);
    nuevoSaldo = parseFloat(nuevoSaldo).toFixed(2);
    if (nuevoSaldo > 990) {
        mostrarMensaje(document.querySelector('.deposito__mensaje'), 'Depósito excede al límite permitido en su cuenta.');
        return;
    }
    usuarioLogueado.saldo = nuevoSaldo;
    document.querySelector('.deposito__saldo').textContent = `Saldo Actual $${nuevoSaldo}`;
}

const realizarRetiro = () => {
    let txtMontoRetiro = document.getElementById('txtMontoRetiro');
    let nuevoSaldo = parseFloat(usuarioLogueado.saldo) - parseFloat(txtMontoRetiro.value);
    nuevoSaldo = parseFloat(nuevoSaldo).toFixed(2);
    if (nuevoSaldo < 10) {
        mostrarMensaje(document.querySelector('.retiro__mensaje'), 'Retiro excede al límite permitido en su cuenta.');
        return;
    }
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