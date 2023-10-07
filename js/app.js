//Creamos las cuentas de los usuarios
let cuentas = [
    {nombre: 'Mali', saldo: 200, dni: '58668985', password: 'helloworld' },
    {nombre: 'Gera', saldo: 290, dni: '74859655', password: 'l33t' },
    {nombre: 'Maui', saldo: 67, dni: '45789656', password: '123' },
    {nombre: 'Marco', saldo: 280, dni: '73124178', password: '9999' }
];
//Creamos variable global
let usuarioLogueado = null;

//Inicializamos los controles
let btnIniciarSesion = document.querySelector('.login__iniciarsesion');
let seccionLogin = document.querySelector('.seccion__login');
let seccionMenu = document.querySelector('.seccion__menu');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let seccionConsSaldo = document.querySelector('.seccion__consultasaldo');
let btnOpcConsSaldo = document.querySelector('.opcion__consultasaldo');
let seccionDeposito = document.querySelector('.seccion__deposito');
let btnOpcDeposito = document.querySelector('.opcion__deposito');
let seccionRetiro = document.querySelector('.seccion__retiro');
let btnOpcRetiro = document.querySelector('.opcion__retiro');
let btnDepositar = document.getElementById('btnDepositar');

// let btnRetirar = document.getElementById('btnRetirar');

//Funciones
const iniciarSesion = () => {
    let nrodni = document.getElementById('txtNroDNI');
    let contrasenia = document.getElementById('txtContrasenia');

    if (nrodni.value == '' || contrasenia.value == '') {
        alert('Los campos dni o contraseña no pueden estar vacíos.!!!')
        return;
    }

    usuarioLogueado = cuentas.find((cuenta) => {
        return cuenta.dni == nrodni.value && cuenta.password == contrasenia.value;
    });

    if (usuarioLogueado == undefined) {
        alert('No se encontró el usuario con las credenciales ingresadas.!!!');
        nrodni.value = '';
        contrasenia.value = '';
        nrodni.focus();
        return;
    }

    nrodni.value = '';
    contrasenia.value = '';
    seccionLogin.classList.add('ocultar');
    mostrarMenuOpciones();
};

const cerrarSesion = () => {
    let posicion = cuentas.findIndex((cuenta) => {
        return cuenta.dni == usuarioLogueado.dni && cuenta.password == usuarioLogueado.password;
    });
    cuentas[posicion] = usuarioLogueado;
    usuarioLogueado = null;
    seccionMenu.classList.add('ocultar');
    seccionLogin.classList.remove('ocultar');
    document.getElementById('txtNroDNI').focus();
}

const mostrarMenuOpciones = () => {
    seccionMenu.classList.remove('ocultar');
    //Mostramos el nombre de la persona logueada
    let nombreUsuario = document.querySelector('.menu__nombreusuario');
    nombreUsuario.textContent = `Bienvenido, ${usuarioLogueado.nombre}`;
}

const mostrarMenuConsSaldo = () => {
    seccionMenu.classList.add('ocultar');
    seccionConsSaldo.classList.remove('ocultar');
    seccionConsSaldo.querySelector('.conssaldo_saldo').textContent = `$${usuarioLogueado.saldo}`;
}

const mostrarMenuDeposito = () => {
    seccionMenu.classList.add('ocultar');
    seccionDeposito.classList.remove('ocultar');
}

const mostrarMenuRetiro = () => {
    seccionMenu.classList.add('ocultar');
    seccionRetiro.classList.remove('ocultar');
}

const regresarMenu = (e) => {
    e.parentNode.parentNode.parentNode.classList.add('ocultar');
    seccionMenu.classList.remove('ocultar');
}

const realizarDeposito = () => {
    let txtMontoDeposito = document.getElementById('txtMontoDeposito');
    let nuevoSaldo = usuarioLogueado.saldo + parseFloat(txtMontoDeposito.value);
    if (nuevoSaldo > 990) {
        console.log('Depósito excede al límite permitido en su cuenta!!!');
        return;
    }
    usuarioLogueado.saldo = nuevoSaldo;
    document.querySelector('.deposito__saldo').textContent = `Saldo Actual $${nuevoSaldo}`;
}

const realizarRetiro = () => {
    let txtMontoRetiro = document.getElementById('txtMontoRetiro');
    let nuevoSaldo = usuarioLogueado.saldo - parseFloat(txtMontoRetiro.value);
    if (nuevoSaldo < 10) {
        console.log('Retiro excede al límite permitido en su cuenta!!!');
        return;
    }
    usuarioLogueado.saldo = nuevoSaldo;
    console.log(`Nuevo Saldo: $${nuevoSaldo}`);
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

btnDepositar.addEventListener('click', () => {
    realizarDeposito();
});

// btnRetirar.addEventListener('click', () => {
//     realizarRetiro();
// });