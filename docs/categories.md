# Categorías

Lista cerrada que la IA puede devolver. Cada objeto de la foto (o cada parte) cae en exactamente una.

**Cómo leer la tabla**

- **Destino típico** es la hipótesis de trabajo según el sistema alemán general. **No es una regla.** Cada ciudad se verifica contra su guía oficial (AWB Köln, AWISTA Düsseldorf, BSR Berlín) antes de cargarla en `rules`.
- Las filas marcadas **⚠ varía** son las que más probablemente cambian entre ciudades. Las reglas investigadas están en [city-rules.md](city-rules.md).
- **Pregunta** significa que la categoría pide aclaración y deriva a otra categoría (ver [answer-logic.md](answer-logic.md#4-pregunta-de-aclaración)).

## Envases (Verpackungen)

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `envase_plastico` | vaso de yogur, botella de champú, film, bolsa, bandeja | Gelbe Tonne / Wertstofftonne | — |
| `envase_metal` | lata de conserva, tapa de aluminio, papel aluminio | Gelbe Tonne / Wertstofftonne | — |
| `envase_compuesto` | tetra brik, sobre de café | Gelbe Tonne / Wertstofftonne | — |
| `botella_bebida_plastico` | botella de agua o gaseosa | — | ¿Tiene logo de Pfand? sí → `pfand` · no → `envase_plastico` |
| `lata_bebida` | lata de cerveza o gaseosa | — | ¿Tiene logo de Pfand? sí → `pfand` · no → `envase_metal` |
| `pfand` | (solo se llega por pregunta) | Devolver en el súper (`store_return`) | — |

## Papel

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `papel_carton` | diario, revista, caja de cartón limpia, sobre | Papiertonne | — |
| `caja_pizza` | caja de pizza | — | ¿Está muy sucia de grasa o con restos? sí → `resto_general` · no → `papel_carton` |
| `papel_sucio` | servilleta usada, papel de cocina | Biotonne o Restmüll **⚠ varía** | — |
| `papel_especial` | ticket térmico, papel con plástico, foto | Restmüll | — |

## Vidrio

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `botella_vidrio_bebida` | botella de cerveza, agua, vino | — | ¿Tiene Pfand? sí → `pfand` · no → `vidrio_envase` |
| `vidrio_envase` | frasco de mermelada, botella de vino sin Pfand | Contenedor de vidrio por color (`public_container`) | ¿Color? blanco / verde / marrón. Otros colores (azul, rojo) van al verde |
| `vidrio_no_envase` | vaso de beber, ventana, espejo, pyrex | Restmüll (no va al contenedor de vidrio) **⚠ varía** (Düsseldorf: espejos a Sperrmüll) | — |
| `ceramica_porcelana` | taza, plato, maceta de barro | Restmüll | — |

## Orgánico

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `organico_crudo` | cáscaras, restos de verdura, borra de café, saquito de té | Biotonne | — |
| `organico_cocido` | sobras de comida, carne, pescado, pan | Biotonne **⚠ varía** | — |
| `jardin` | pasto, hojas, ramas chicas, flores | Biotonne / punto de poda **⚠ varía** | — |

## Restmüll

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `resto_general` | pañal, cepillo de dientes, bolsa de aspiradora, colillas, arena de gato | Restmüll | — |
| `plastico_no_envase` | juguete, balde, perchero, tupper roto | Wertstofftonne en las 3 ciudades de lanzamiento (ver [city-rules.md](city-rules.md)) | — |
| `metal_no_envase` | sartén, olla, cubiertos, herramientas | Wertstofftonne en las 3 ciudades de lanzamiento (ver [city-rules.md](city-rules.md)) | — |

## Especiales

| key | Ejemplos | Destino típico | Pregunta |
|---|---|---|---|
| `pila_bateria` | pilas, baterías recargables, power bank | Devolver en tienda o súper (`store_return`) | — |
| `electronico_chico` | celular, cable, secador, juguete con pilas | Tienda o Wertstoffhof | — |
| `electronico_grande` | heladera, lavarropas, TV | Wertstoffhof o retiro **⚠ varía** | — |
| `bombilla` | lámpara, foco | — | ¿LED o bajo consumo? sí → `bombilla_especial` · no (incandescente) → `resto_general` |
| `bombilla_especial` | (solo se llega por pregunta) | Tienda o Wertstoffhof | — |
| `quimico` | pintura, solvente, aerosol con resto, veneno | Residuos peligrosos (`hazardous`) | — |
| `aceite_cocina` | aceite de freír | **⚠ varía** | — |
| `medicamento` | pastillas, jarabe | Restmüll o farmacia **⚠ varía** | — |
| `cartucho_tinta` | cartucho, tóner | Tienda o Wertstoffhof | — |
| `ropa_calzado` | ropa, zapatos, sábanas | — | ¿Está en buen estado? sí → `ropa_reusable` · no → `resto_general` |
| `ropa_reusable` | (solo se llega por pregunta) | Contenedor de ropa (`public_container`) | — |
| `voluminoso` | mueble, colchón, alfombra | Sperrmüll, con turno (`bulky_pickup`) | — |
| `madera` | tabla, pallet, madera tratada | Wertstoffhof | — |

## Partes compuestas

La IA devuelve un objeto por parte cuando se separan fácil. Ejemplos de prueba:

- Vaso de yogur: `envase_plastico` + tapa `envase_metal`
- Caja con ventana: `papel_carton` + ventana `envase_plastico`
- Frasco de mermelada: `vidrio_envase` + tapa `envase_metal`

## Fuera de la lista

Si la IA no puede ubicar el objeto en ninguna categoría, devuelve `desconocido` y la app muestra "No estoy seguro" (confianza 0).
