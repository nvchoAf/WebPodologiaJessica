
// ==========================================
// PODOLOGÍA CLÍNICA JESSICA
// Funcionalidad de datos bancarios
// ==========================================

// DATOS DE EJEMPLO - REEMPLAZAR ANTES DE PUBLICAR

const datosBancarios = [
  { etiqueta: "Titular", valor: "Jessica Ramillanca Cerda" },
  { etiqueta: "RUT", valor: "14.365.389-7" },
  { etiqueta: "Banco", valor: "Banco Estado" },
  { etiqueta: "Tipo de cuenta", valor: "Cuenta Vista" },
  { etiqueta: "Número de cuenta", valor: "14365389" },
  { etiqueta: "Correo", valor: "jessica_rc30@hotmail.com" }
];

// ELEMENTOS DEL HTML

const listaDatos = document.getElementById("lista-datos");
const botonTodos = document.getElementById("copiar-todos");
const notificacion = document.getElementById("notificacion");

let temporizadorNotificacion;

// COPIAR AL PORTAPAPELES

async function copiarTexto(texto) {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Portapapeles no disponible");
  }

  await navigator.clipboard.writeText(texto);
}

// MOSTRAR NOTIFICACIÓN

function mostrarNotificacion(mensaje) {
  clearTimeout(temporizadorNotificacion);

  notificacion.textContent = mensaje;
  notificacion.classList.add("visible");

  temporizadorNotificacion = setTimeout(() => {
    notificacion.classList.remove("visible");
  }, 2500);
}

// CREAR FILA DE UN DATO BANCARIO

function crearDato(dato) {
  const fila = document.createElement("div");
  fila.className = "dato";

  const informacion = document.createElement("div");
  informacion.className = "dato-informacion";

  const etiqueta = document.createElement("span");
  etiqueta.className = "dato-etiqueta";
  etiqueta.textContent = dato.etiqueta;

  const valor = document.createElement("span");
  valor.className = "dato-valor";
  valor.textContent = dato.valor;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton-copiar";
  boton.textContent = "Copiar";
  boton.setAttribute("aria-label", `Copiar ${dato.etiqueta}`);

  boton.addEventListener("click", async () => {
    try {
      await copiarTexto(dato.valor);
      mostrarNotificacion(`${dato.etiqueta} copiado correctamente`);
      boton.textContent = "✓ Copiado";

      setTimeout(() => {
        boton.textContent = "Copiar";
      }, 2000);
    } catch (error) {
      mostrarNotificacion("No se pudo copiar el dato");
    }
  });

  informacion.append(etiqueta, valor);
  fila.append(informacion, boton);

  return fila;
}

// MOSTRAR TODOS LOS DATOS

datosBancarios.forEach((dato) => {
  listaDatos.appendChild(crearDato(dato));
});


/* COPIAR TODOS LOS DATOS */

botonTodos.addEventListener("click", async () => {

  
const textoCompleto = datosBancarios
  .map((dato) => dato.valor)
  .join("\n");


  try {
    await copiarTexto(textoCompleto);

    botonTodos.innerHTML = "✓ ¡Datos copiados!";

    mostrarNotificacion(
      "¡Todos los datos fueron copiados!"
    );

    setTimeout(() => {
      botonTodos.innerHTML =
        '<span class="icono-copiar" aria-hidden="true">▢</span> Copiar todos los datos';
    }, 2500);

  } catch (error) {
    mostrarNotificacion(
      "No se pudieron copiar los datos"
    );
  }

});

