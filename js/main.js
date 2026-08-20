/* ==========================================================================
   Dental Creación — comportamiento de la página
   Sin dependencias. Todo degrada con elegancia si el JS no carga:
   el contenido ya es visible y navegable sin este archivo.
   ========================================================================== */
(function () {
  'use strict';

  var prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Año del footer
     --------------------------------------------------------------------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     Menú móvil
     --------------------------------------------------------------------- */
  var boton = document.getElementById('alterna-menu');
  var menu = document.getElementById('menu-movil');

  if (boton && menu) {
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('hidden') === false;
      boton.setAttribute('aria-expanded', String(abierto));
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // cerrar al elegir un destino
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.add('hidden');
        boton.setAttribute('aria-expanded', 'false');
        boton.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });

    // cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        boton.setAttribute('aria-expanded', 'false');
        boton.focus();
      }
    });
  }

  /* ---------------------------------------------------------------------
     Revelado al hacer scroll
     Si no hay IntersectionObserver, se muestra todo de inmediato.
     --------------------------------------------------------------------- */
  var revelables = document.querySelectorAll('.revelar');

  if (!('IntersectionObserver' in window) || prefiereMenosMovimiento) {
    Array.prototype.forEach.call(revelables, function (el) { el.classList.add('se-ve'); });
  } else {
    var observadorRevelado = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('se-ve');
          observadorRevelado.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revelables, function (el) { observadorRevelado.observe(el); });
  }

  /* ---------------------------------------------------------------------
     FIRMA — "Las tres capas"
     Enciende la capa del diente que corresponde al capítulo que cruza el
     centro de la pantalla. Es el equivalente al "movimiento de cámara
     atado al scroll": la ilustración avanza conforme se lee.
     --------------------------------------------------------------------- */
  var pasos = document.querySelectorAll('.paso-capa');
  var capas = document.querySelectorAll('.capa');

  function activarCapa(numero) {
    Array.prototype.forEach.call(pasos, function (paso) {
      paso.classList.toggle('esta-activa', paso.dataset.paso === numero);
    });
    Array.prototype.forEach.call(capas, function (capa) {
      capa.classList.toggle('esta-activa', capa.dataset.capa === numero);
    });
  }

  if (pasos.length && 'IntersectionObserver' in window) {
    // la capa 1 arranca encendida (ya viene marcada en el HTML)
    activarCapa('1');

    var observadorCapas = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) activarCapa(entrada.target.dataset.paso);
      });
    }, {
      // banda estrecha al centro del viewport: solo el capítulo que la cruza gana
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    });

    Array.prototype.forEach.call(pasos, function (paso) { observadorCapas.observe(paso); });
  } else if (pasos.length) {
    // sin observer: encender todas para que la ilustración no quede apagada
    Array.prototype.forEach.call(capas, function (capa) { capa.classList.add('esta-activa'); });
    Array.prototype.forEach.call(pasos, function (paso) { paso.classList.add('esta-activa'); });
  }

  /* ---------------------------------------------------------------------
     Botón flotante de WhatsApp — aparece al dejar atrás el hero
     --------------------------------------------------------------------- */
  var flotante = document.getElementById('whatsapp-flotante');

  if (flotante) {
    var alternarFlotante = function () {
      flotante.classList.toggle('se-ve', window.scrollY > 620);
    };
    alternarFlotante();
    window.addEventListener('scroll', alternarFlotante, { passive: true });
  }
})();
