# Brief: flujo principal

Estado: **borrador para confirmar**. Todavía no hay código ni contrato de dirección.

## 1. Tarea y público

- **Quién:** alguien que vive en Alemania (sobre todo quien recién llegó) y está en su casa o frente a los tachos del patio, con el objeto en una mano y el teléfono en la otra.
- **Qué necesita:** saber en segundos dónde va el objeto según las reglas de su ciudad.
- **Modo:** Operate. Es una herramienta: tiene que funcionar antes de lucirse.

## 2. Resultado buscado

- **Tarea principal:** foto → destino + cómo descartarlo.
- **Éxito:** la persona tira el objeto en el lugar correcto sin leer más de dos líneas.
- **Lo propio de este producto:** las reglas son de la ciudad y los tachos se nombran en alemán con traducción. La app enseña el sistema mientras responde.

## 3. Dirección elegida: Tonnendeckel

- **Idea central:** la pantalla es la tapa del tacho. El resultado inunda todo el teléfono con el color del destino correcto. Frente al patio, la persona mira la pantalla, mira las tapas y las empareja.
- **De dónde sale el color:** el color de cada tacho viene de la ciudad (`destinations.color`), porque no es igual en todas.
- **Lo que no se negocia:**
  - El nombre alemán del destino siempre aparece en grande, con la traducción al lado. El color nunca va solo.
- **Momento distintivo: tapas apiladas.** Un objeto con partes (vaso + tapa, caja con ventana) se muestra como bandas horizontales, una por parte, cada una en el color de su tacho.
- **Riesgo asumido:** es la dirección más familiar de la categoría. La distinción tiene que salir de la ejecución: nombre alemán como protagonista, tapas apiladas, cero ornamento.

## 4. Alcance

**Pantallas**
- Primer uso
- Cámara
- Resultado
- Estados de duda
- Búsqueda manual
- Historial
- Ajustes

**Fidelidad:** pantallas de producción en Expo, iOS y Android.

**Destinos fuera de casa** (contenedor de vidrio, Recyclinghof, tienda): se muestra solo qué hacer y cómo. Sin mapa, sin horarios.

**Anti-metas**
- Gamificación: puntos, rachas, "salvaste X kg de CO₂".
- Tono culposo o de sermón.
- Parecer una app oficial del municipio o de la empresa de residuos.
- Mucho texto.

## 5. Pantallas y estados

| Pantalla | Qué hace | Notas |
|---|---|---|
| Primer uso | Idioma → ciudad (detectada con permiso, o elegida de una lista) → "Seguir como invitado" o "Iniciar sesión" | Listas nativas. Tres pasos, sin carrusel de bienvenida. Si se niega la ubicación, la ciudad se elige a mano. |
| Cámara | Visor a pantalla completa, botón de disparo, acceso a Buscar, ciudad visible | Pantalla de inicio. Si se niega el permiso de cámara, la búsqueda queda como camino principal. |
| Analizando | Foto congelada con indicador | Sin animaciones de "escáner con IA". |
| Resultado | Inundación en el color del destino: nombre alemán enorme, traducción, una línea de qué entra, 1 a 3 pasos, "Escanear otra cosa" | Debajo, discreto: ¿Te sirvió? (pulgar arriba o abajo, o "Era otra cosa"). |
| Resultado con partes | Tapas apiladas: una banda por parte | Máximo 3 partes visibles. |
| ¿Es esto? (confianza media) | Fondo neutro: la mejor opción y 2 alternativas, cada una con su muestra de color | Un toque confirma. |
| Pregunta | Fondo neutro: una pregunta y dos respuestas grandes ("¿Tiene logo de Pfand?") | Para Pfand se muestra el logo real. |
| No estoy seguro | Fondo neutro: "Sacar otra foto" y "Buscar a mano" | Honesto, sin culpa. |
| Sin regla para tu ciudad | Fondo neutro: "Todavía no tenemos esta regla para Köln" y link a la guía oficial | Nunca adivina con una regla nacional. |
| Fuera de casa | Inundación en grafito, con un rótulo de destino ("Contenedor de vidrio", "Recyclinghof", "Devolver en la tienda") | El vidrio usa el color del contenedor (blanco, verde o marrón). |
| Búsqueda | Campo nativo, resultados con muestra de color del destino | Busca en de, en y es. Los alias salen del Abfall-ABC. |
| Historial | Lista con una franja del color del destino por fila | Una corrección se ve tachada, con el destino correcto al lado. Vacío: una línea y el botón de cámara. |
| Ajustes | Lista agrupada nativa: ciudad, idioma, cuenta opcional, borrar historial | Borrar queda aislado. |

**Rangos realistas**
- **Nombres alemanes:** de "Glas" a "Wertstofftonne" o "Schadstoffsammelstelle". El tamaño grande tiene que admitir partir la palabra con guion.
- **Pasos:** de 0 a 3.
- **Partes:** de 1 a 3.

## 6. Interacción y layout

- **Navegación:**
  - iOS: tab bar (Cámara, Buscar, Historial, Ajustes).
  - Android: navigation bar de Material 3.
  - El resultado se abre como pantalla completa sobre la cámara y se cierra con el gesto nativo.
- **Tipografía:** la del sistema (SF y Roboto) con Dynamic Type / escala de fuente. El nombre alemán usa el estilo más grande del sistema, no un tamaño fijo.
- **Color:**
  - La interfaz es neutra (tinta y blanco); el color pertenece a los destinos.
  - Contraste de texto AA sobre cada color de tacho: negro sobre amarillo, blanco sobre azul, marrón y grafito.
  - Modo oscuro: las inundaciones mantienen el color y el resto sigue al sistema.
- **Movimiento:** la inundación sube desde abajo como una tapa que se abre, una sola vez. Con "reducir movimiento" se usa un fundido.
- **Áreas táctiles:** 44 pt en iOS y 48 dp en Android. El disparo y "Escanear otra cosa" se alcanzan con el pulgar.

## 7. Restricciones y decisiones abiertas

- **Stack:** Expo (React Native + TS). Componentes nativos de cada plataforma, sin controles inventados.
- **Idiomas:** de, en, es. El alemán de la interfaz es un idioma más; los nombres de destino en alemán aparecen siempre.
- **Abierto:**
  - Nombre del producto e ícono.
  - Qué agrega la cuenta frente al modo invitado.
  - Comportamiento sin conexión.
  - Colores exactos de cada tacho por ciudad (se toman de las ciudades, no se inventan).
  - Cómo se ve el Pfand: ¿color propio o grafito "fuera de casa"?
