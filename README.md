# Audify (After Effects)

**Audify** es un panel ScriptUI para After Effects que te ayuda a **controlar volumen rápido** y a **hacer ducking automático** (bajar música cuando entra voz/diálogo).

<img width="298" height="272" alt="Audify" src="https://github.com/user-attachments/assets/4f196a54-6fc1-4c45-a8f4-8b8ecb9b6cf6" />

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
- Windows: `Edit` → `Preferences` → `Scripting & Expressions`
- macOS: `After Effects` → `Preferences` → `Scripting & Expressions`

Activa:
- **Allow Scripts to Write Files and Access Network** (recomendado)

---

## Cómo se usa (flujo rápido)
1. En tu comp, ten al menos 1 layer de **voz/diálogo** y 1 layer de **música**.
2. Abre `Window → Audify`.
3. (Opcional) Usa **Detect** para analizar la voz.
4. Usa **Ducking** para crear el ducking en la música.

---

## Botones del panel

### Audio Controls
- **📈 Fade In**: aplica un **fade in** al audio del layer seleccionado (entrada suave).
- **📉 Fade Out**: aplica un **fade out** al audio del layer seleccionado (salida suave).
- **〰️ Curva/Suavizado**: aplica una **variante de curva** (fade más suave / interpolación distinta).

### Effects & Ducking
- **3️⃣ dB (Intensidad)**: define la **cantidad en dB** que se usará para bajar/subir volumen (y/o ducking).
  - Ejemplo: **3 dB** = cambio suave. (Si tu panel permite más valores, más dB = ducking más fuerte.)
- **🔉 Vol −**: baja el volumen del layer seleccionado en el valor indicado (por ejemplo, −3 dB).
- **🔊 Vol +**: sube el volumen del layer seleccionado en el valor indicado (por ejemplo, +3 dB).
- **🔇 Mute/Unmute**: alterna **silenciar / reactivar** el audio del layer seleccionado (según tu implementación).
- **🕵️ Detect**: analiza el layer de **voz/diálogo** para detectar actividad (picos/presencia de audio).
- **🦆 Ducking**: crea el **ducking automático** (keyframes) en la música basándose en la voz.

---

## Recomendaciones
- Para ducking: normalmente detectas con la **voz** y aplicas ducking sobre la **música** (según el flujo que use tu panel).
- Si algo no funciona en una comp compleja, prueba primero en una comp simple para validar selección y permisos.

---

## Problemas comunes
- **No aparece en Window**: revisa que el archivo esté en `ScriptUI Panels` y reinicia After Effects.
- **Botones no hacen nada**: confirma que hay un layer seleccionado y que tu comp tiene audio.
- **Ducking raro**: ajusta el valor de dB (más dB = más bajará la música).

---

## Autor
Animateoo
