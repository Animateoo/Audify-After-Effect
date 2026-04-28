# Audify (After Effects)
**Audify** es un panel ScriptUI para After Effects que te ayuda a **controlar volumen rápido** y a **hacer ducking automático** (bajar música cuando entra voz/diálogo).

<img width="298" height="272" alt="Audify" src="https://github.com/user-attachments/assets/cc7d3307-08a4-461e-87d0-cf8ec7d8715c" />

---
## Instalación
### Windows
1. Cierra After Effects.
2. Copia `Audify.jsx` en:
`C:\Users\<TU_USUARIO>\AppData\Roaming\Adobe\After Effects\<VERSION>\Scripts\ScriptUI Panels\`
3. Abre After Effects.
4. Ve a `Window` → **Audify**.
### macOS
1. Cierra After Effects.
2. Copia `Audify.jsx` en:
`/Users/<TU_USUARIO>/Library/Preferences/Adobe/After Effects/<VERSION>/Scripts/ScriptUI Panels/`
3. Abre After Effects.
4. Ve a `Window` → **Audify**.
### Permisos recomendados (Windows y macOS)
En After Effects:
`Edit` (o `After Effects` en macOS) → `Preferences` → `Scripting & Expressions`
- Activa **Allow Scripts to Write Files and Access Network** (recomendado)
---
## Cómo se usa (flujo rápido)
1. En tu comp, ten al menos 1 layer de **voz/diálogo** y 1 layer de **música**.
2. Abre `Window → Audify`.
3. Usa **Detect** para analizar la voz (si tu flujo lo requiere).
4. Usa **Ducking** para crear el ducking en la música.
---
## Botones del panel
> Basado en la UI del panel (secciones “Audio Controls” y “Effects & Ducking”).
### Audio Controls
- **Fade In** (icono de curva subiendo): aplica un **fade in** al audio del layer seleccionado (entrada suave).
- **Fade Out** (icono de curva bajando): aplica un **fade out** al audio del layer seleccionado (salida suave).
- **Curva/Suavizado** (tercer icono de curva): aplica una **variante de curva** (más suave / diferente interpolación) para el fade.
### Effects & Ducking
- **3 dB** (botón con número): define la **intensidad en dB** que se usará al bajar/subir volumen (y/o ducking).  
  - Ejemplo: 3 dB = cambio suave. Si lo subes (6/9/12 dB) el ducking será más notorio.
- **Vol −** (icono speaker con “−”): baja el volumen del layer seleccionado en el valor indicado (por ejemplo, −3 dB).
- **Vol +** (icono speaker con “+”): sube el volumen del layer seleccionado en el valor indicado (por ejemplo, +3 dB).
- **Mute/Unmute** (icono speaker solo): alterna **silenciar / reactivar** el audio del layer seleccionado (según tu implementación puede ser activar/desactivar audio o poner gain a 0).
- **Detect**: analiza el layer de **voz/diálogo** para detectar presencia de audio (picos/actividad).  
  - Normalmente se usa antes de Ducking para que el panel sepa **dónde** bajar la música.
- **Ducking**: crea el **ducking automático** (keyframes) en la música basándose en la voz/diálogo, bajando el volumen cuando detecta voz y recuperándolo cuando termina.
---
## Recomendaciones
- Para ducking: selecciona primero el layer de **voz** (para detectar) y luego el layer de **música** (para aplicar ducking), o sigue el orden que tu panel indique.
- Si no funciona en una comp compleja, prueba en una comp simple para validar permisos y selección de layers.
---
## Problemas comunes
- **No aparece en Window**: revisa que el archivo esté en `ScriptUI Panels` y reinicia After Effects.
- **Botones no hacen nada**: confirma que hay un layer seleccionado y que tu comp tiene audio.
- **Ducking raro**: ajusta el valor de dB (más dB = más bajará la música).
---
## Autor
Animateoo
