# Reglas por ciudad

Borrador de la tabla `rules` para las ciudades de lanzamiento. Cubre las categorías marcadas **⚠ varía** en [categories.md](categories.md), más bombillas, que resultaron distintas.

**Estado de verificación**
- ✅ Confirmado en una fuente oficial (página o PDF de la empresa de residuos)
- 🟡 Fuente oficial ambigua, o solo prensa. Confirmar con atención al cliente antes de cargar.
- ❌ Sin fuente. No se carga: la app muestra "Todavía no tenemos esta regla" y el link a la guía.

## Hallazgo principal

**Las tres ciudades tienen Wertstofftonne.** En Köln es la Gelbe Tonne desde 2014; en Düsseldorf la Gelbe Tonne se amplió; Berlín tiene tachos amarillos o naranjas. En las tres, además de envases, entran objetos de plástico y metal que no son envases, como ollas, sartenes, baldes o juguetes chicos. Para nuestras tres ciudades, `plastico_no_envase` y `metal_no_envase` dejan de variar.

Ojo: esto **no** vale para toda Alemania. Muchas ciudades siguen con la Gelbe Tonne clásica, solo para envases.

## Tabla

| Categoría | Köln (AWB) | Düsseldorf (AWISTA) | Berlín (BSR) |
|---|---|---|---|
| `papel_sucio` (servilletas, papel de cocina) | Biotonne ✅ | **Restmüll** ✅ (lo lista como Hygieneartikel) | Biotonne ✅ |
| `organico_cocido` | Biotonne ✅ (incluye carne y pescado) | Biotonne 🟡 (solo prensa) | Biotonne, envuelto en papel de diario ✅ |
| `jardin` | Biotonne o retiro de poda (con turno) ✅ | Biotonne, recolección de poda o Recyclinghof ✅ | Biotonne o bolsas de hojas de la BSR ✅ |
| `plastico_no_envase` | Wertstofftonne ✅ | Wertstofftonne; los grandes van a Sperrmüll ✅ | Wertstofftonne ✅ |
| `metal_no_envase` | Wertstofftonne (ollas, sartenes, cubiertos) ✅ | Wertstofftonne ✅ | Wertstofftonne ✅ |
| `electronico_grande` | Retiro de electrodomésticos (turno con el servicio de Sperrmüll) o Wertstoff-Center ✅ | Recyclinghof Flingern, Sperrmüll o tienda al comprar uno nuevo ✅ | Recyclinghof (gratis), Sperrmüll (gratis para electro) o tienda ✅ |
| `aceite_cocina` | Poco: Restmüll bien cerrado; mucho: Schadstoffmobil 🟡 (el PDF es ambiguo) | Poco: Restmüll bien cerrado; mucho: Recyclinghof Flingern en envase de plástico cerrado ✅ | ❌ (la BSR no lo aclara para hogares) |
| `medicamento` | Restmüll (cantidades chicas) ✅ | Restmüll o Schadstoffsammlung ✅ | Restmüll permitido, pero se recomienda farmacia o punto de residuos peligrosos de la BSR ✅ |
| `bombilla` incandescente / halógena | Restmüll ✅ | Restmüll 🟡 | Restmüll ✅ |
| `bombilla_especial` (LED, bajo consumo) | Schadstoffmobil, Bürgeramt o tienda ✅ | Recyclinghof o tienda 🟡 | Recyclinghof, sin romper ✅ |

Para todas: nunca tirar aceite ni medicamentos por el inodoro o la pileta. La app lo dice siempre.

## Lo que no entra en la Wertstofftonne

Para el texto de "No va acá" en la app.

| | Köln ✅ | Berlín ✅ |
|---|---|---|
| No entra | Pilas, escombros, CDs/DVDs, electrónicos, lámparas de bajo consumo, vidrio, goma, madera, cables, textiles, cassettes | Electrónicos, lámparas de bajo consumo, pilas, textiles, madera, soportes de datos |

En Düsseldorf no encontré una lista equivalente de exclusiones.

## Envases, papel, vidrio, ropa y voluminosos

### Envases

| Categoría | Köln | Düsseldorf | Berlín |
|---|---|---|---|
| `envase_plastico` | Wertstofftonne ✅ | Wertstofftonne ✅ | Wertstofftonne ✅ |
| `envase_metal` | Wertstofftonne ✅ | Wertstofftonne ✅ | Wertstofftonne, incluye papel aluminio y tapas ✅ |
| `envase_compuesto` (tetra brik) | Wertstofftonne ✅ | Wertstofftonne ✅ | Wertstofftonne ✅ |
| `pfand` | Devolver en cualquier tienda que venda ese tipo de envase. Es ley nacional (DPG), igual en todo el país ✅ | | |

En la Wertstofftonne los envases van **vacíos**, pero no hace falta lavarlos. Así lo dice Köln: "inhaltsleer".

### Papel

| Categoría | Köln | Düsseldorf | Berlín |
|---|---|---|---|
| `papel_carton` | Blaue Tonne (cartones grandes, desarmados) ✅ | Altpapier ✅ | Papiertonne ✅ |
| `caja_pizza` | Sucia: Restmüll ✅ · Limpia: Blaue Tonne 🟡 (implícito) | Sucia: Restmüll ✅ · Limpia: 🟡 (no lo dice) | Sin restos ni grasa: Papiertonne · Muy sucia: Restmüll ✅ |
| `papel_especial` (ticket, papel encerado, foto) | Restmüll 🟡 | Ticket: Restmüll (papel térmico) ✅ | Papel recubierto: Restmüll ✅ · ticket no mencionado 🟡 |

En las tres ciudades el **tetra brik no va al papel**: va a la Wertstofftonne ✅. Es un error típico de quien llega.

### Vidrio

| Categoría | Köln | Düsseldorf | Berlín |
|---|---|---|---|
| `vidrio_envase` | Contenedor blanco / verde / marrón; azul va al verde ✅ | Altglas; azul va al verde ✅ | Blanco / verde / marrón; azul y rojo van al verde; la tapa puede quedar puesta ✅ |
| `vidrio_no_envase` | Restmüll (vidrio roto) ✅ | Espejo: **Sperrmüll** ✅ · vaso: 🟡 | No va al contenedor ✅ · destino Restmüll 🟡 (implícito) |
| `ceramica_porcelana` | Restmüll ✅ | Restmüll en cantidades chicas ✅ | Restmüll ✅ |

Horario para tirar vidrio en Köln: lunes a viernes de 7 a 20 ✅. Es buen dato para la pantalla de resultado.

### Ropa

| Categoría | Köln | Düsseldorf | Berlín |
|---|---|---|---|
| `ropa_reusable` | Contenedor de ropa (~400 de la ciudad, casi siempre junto al de vidrio) o Wertstoff-Center; en bolsa, zapatos atados de a pares ✅ | Contenedor de ropa, en bolsa, zapatos atados de a pares ✅ | Contenedor de ropa o Recyclinghof; ropa limpia y seca, zapatos de a pares ✅ |
| `ropa_calzado` en mal estado | 🟡 (la AWB solo acepta ropa "tragbar") | Muy sucia: Restmüll ✅ | Rota, sucia o húmeda: Restmüll ✅ |

En Köln la ropa **no** va a la Wertstofftonne ✅.

### Voluminosos y madera

| Categoría | Köln | Düsseldorf | Berlín |
|---|---|---|---|
| `voluminoso` | Retiro gratis hasta 3 m³ con turno (unas 3 semanas de espera), retiro exprés pago, o llevarlo gratis al Wertstoff-Center (hasta 3 m³) ✅ | Retiro con aviso, Recyclinghof Flingern o Deponie ✅ · precio 🟡 | Llevarlo gratis al Recyclinghof (hasta 3 m³) ✅ · retiro a pedido, precio 🟡 |
| `madera` | Pedazos chicos: Restmüll ✅ · más: Wertstoff-Center ✅ | Altholz en el Recyclinghof; muebles de madera con el retiro de voluminosos ✅ | No va a la Wertstofftonne ✅ · Recyclinghof 🟡 |

## Pendiente

- **Confirmar los 🟡**:
  - Köln: aceite, caja de pizza limpia, tickets, ropa rota
  - Düsseldorf: comida cocida, bombillas, caja de pizza limpia, vasos, precio del retiro de voluminosos
  - Berlín: tickets, vasos, madera, precio del retiro de voluminosos
- **Berlín, aceite de cocina**: preguntar a la BSR (030 7592-4900).
- **Sin verificar por ciudad**: `organico_crudo`, `resto_general`, `pila_bateria`, `electronico_chico`, `quimico`, `cartucho_tinta`. Las fuentes ya revisadas los mencionan de pasada y coinciden con el sistema general.
- **Fuentes viejas de Köln**: los PDFs de la AWB son de 2016 y 2021. Revisar si la app de la AWB tiene datos más nuevos.

## Fuentes

**Köln**
- [Folleto Wertstofftonne (AWB, 2016)](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Wertstofftonne.pdf)
- [Folleto Biotonne (AWB, 2016)](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Biotonne.pdf)
- [Abfall- und Wertstoff-ABC (AWB, 2021)](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/Flyer-Abfall-und-Wertstoff-ABC.pdf)
- [Biotonne (AWB)](https://www.awbkoeln.de/biotonne)
- Folletos de la AWB:
  - [Restmüll](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Restmuell.pdf)
  - [Altpapier](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Altpapier.pdf)
  - [Altglas](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Altglas.pdf)
  - [Sperrmüll](https://www.awbkoeln.de/medien/Downloads/Entsorgung-von-Abfaellen/AWB-Handzettel-Sperrmuell.pdf)
- [Altkleider (AWB)](https://www.awbkoeln.de/altkleider)

**Düsseldorf** ([Abfall-ABC de AWISTA](https://www.awista-kommunal.de/abfall-abc), páginas `/abfall-abc/<slug>`)
- [haushaltswaren](https://www.awista-kommunal.de/abfall-abc/haushaltswaren)
- [spielzeug](https://www.awista-kommunal.de/abfall-abc/spielzeug)
- [hygieneartikel](https://www.awista-kommunal.de/abfall-abc/hygieneartikel)
- [speisefett-oel](https://www.awista-kommunal.de/abfall-abc/speisefett-oel)
- [medikamente](https://www.awista-kommunal.de/abfall-abc/medikamente)
- [rasenschnitt](https://www.awista-kommunal.de/abfall-abc/rasenschnitt)
- [kuehlschrank](https://www.awista-kommunal.de/abfall-abc/kuehlschrank)
- [electrónicos voluminosos](https://www.awista-kommunal.de/abfall-abc/elektrogeraet-sperrig-haushaltsgerat-dv-tk-unterhaltungselektronik)
- Más páginas `/abfall-abc/<slug>`:
  - [verpackungen-kunststoff-metall-verbundstoff](https://www.awista-kommunal.de/abfall-abc/verpackungen-kunststoff-metall-verbundstoff)
  - [getraenkekartons](https://www.awista-kommunal.de/abfall-abc/getraenkekartons)
  - [papier-pappe-kartonagen](https://www.awista-kommunal.de/abfall-abc/papier-pappe-kartonagen)
  - [pizzakarton](https://www.awista-kommunal.de/abfall-abc/pizzakarton)
  - [kassenbon](https://www.awista-kommunal.de/abfall-abc/kassenbon)
  - [verpackung-glas](https://www.awista-kommunal.de/abfall-abc/verpackung-glas)
  - [blaues-glas](https://www.awista-kommunal.de/abfall-abc/blaues-glas)
  - [spiegel](https://www.awista-kommunal.de/abfall-abc/spiegel)
  - [geschirr-kleine-mengen](https://www.awista-kommunal.de/abfall-abc/geschirr-kleine-mengen)
  - [alttextilien](https://www.awista-kommunal.de/abfall-abc/alttextilien)
  - [moebel](https://www.awista-kommunal.de/abfall-abc/moebel)
  - [holz](https://www.awista-kommunal.de/abfall-abc/holz-nicht-getraenkt-nicht-impraegniert-nicht-mit-kunststoff-beschichtet)
- Prensa: [Wertstofftonne](https://www.ddorf-aktuell.de/?p=123241), [Biotonne](https://www.ddorf-aktuell.de/?p=137335)

**Berlín**
- [Trennen (BSR)](https://www.bsr.de/trennen)
- [Biogut (BSR)](https://www.bsr.de/biogut)
- [Elektrogeräte (BSR)](https://www.bsr.de/elektrogeraete)
- [Sperrmüll (BSR)](https://www.bsr.de/sperrmuell)
- [Altkleider (BSR)](https://www.bsr.de/altkleider)
- [Medicamentos (LAGeSo Berlín)](https://www.berlin.de/lageso/_assets/gesundheit/publikationen/flyer_alte_arzneimittel_richtig_entsorgen.pdf)
- [Residuos especiales (BSR)](https://www.bsr.de/speisereste-20977.php)
