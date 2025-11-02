# Configuración de Google Analytics 4 - ACM Venezuela

## ✅ Cambios Realizados

He implementado Google Analytics 4 correctamente en tu proyecto Next.js. Los cambios incluyen:

### 1. **Archivo `pages/_document.js` (NUEVO)**
   - Añade el script de Google Analytics en el `<head>` de todas las páginas
   - Carga gtag.js de forma asíncrona
   - Inicializa Google Analytics con tu Measurement ID

### 2. **Archivo `lib/gtag.js` (NUEVO)**
   - Funciones helper para rastrear páginas y eventos
   - `pageview(url)`: Rastrea vistas de página
   - `event()`: Rastrea eventos personalizados

### 3. **Archivo `pages/_app.js` (ACTUALIZADO)**
   - Importa las funciones de gtag
   - Rastrea automáticamente cada cambio de ruta
   - Compatible con navegación del lado del cliente de Next.js

### 4. **Archivo `firebase/config.js` (ACTUALIZADO)**
   - Inicialización mejorada de Firebase Analytics
   - Solo se ejecuta en el lado del cliente
   - Previene errores de hidratación

## 🔧 Pasos para Completar la Configuración

### 1. Verifica tus Variables de Entorno

Asegúrate de que tu archivo `.env.local` tenga el prefijo `NEXT_PUBLIC_`:

```bash
NEXT_PUBLIC_API_KEY=tu_api_key
NEXT_PUBLIC_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_APP_ID=tu_app_id
NEXT_PUBLIC_MEASUREMENT_ID=G-XXXXXXXXXX  # ⚠️ MUY IMPORTANTE
```

**⚠️ IMPORTANTE:** Las variables en Next.js que se usan en el cliente DEBEN tener el prefijo `NEXT_PUBLIC_`.

### 2. Obtén tu Measurement ID de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Selecciona tu propiedad de ACM Venezuela
3. Ve a **Administración** → **Flujos de datos**
4. Selecciona tu flujo de datos web
5. Copia el **ID de medición** (formato: `G-XXXXXXXXXX`)
6. Pégalo en tu archivo `.env.local` como `NEXT_PUBLIC_MEASUREMENT_ID`

### 3. Verifica en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto de ACM Venezuela
3. Ve a **Analytics** → **Google Analytics**
4. Verifica que esté vinculado a tu cuenta de GA4
5. El `measurementId` debe coincidir con el de Google Analytics

### 4. Despliega tu Aplicación

Si estás usando Vercel, Railway, u otro servicio:

1. **Añade las variables de entorno** en el panel de configuración
2. Asegúrate de incluir todas las variables con el prefijo `NEXT_PUBLIC_`
3. **Redespliega** tu aplicación para que los cambios surtan efecto

### 5. Prueba la Instalación

#### Opción A: Usando Tag Assistant (Recomendado)
1. Instala [Tag Assistant Companion](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm)
2. Visita tu sitio web
3. Abre Tag Assistant
4. Verifica que aparezca tu etiqueta de Google Analytics

#### Opción B: Usando Google Analytics en Tiempo Real
1. Ve a Google Analytics
2. Menú **Informes** → **Tiempo real**
3. Navega por tu sitio web
4. Deberías ver tus visitas en tiempo real

#### Opción C: Usando DevTools
1. Abre las DevTools de Chrome (F12)
2. Ve a la pestaña **Network**
3. Filtra por `google-analytics.com` o `analytics`
4. Navega por tu sitio
5. Deberías ver peticiones a Google Analytics

## 📊 Uso de Eventos Personalizados

Puedes rastrear eventos personalizados en cualquier componente:

```javascript
import * as gtag from '../lib/gtag';

// En un manejador de eventos
const handleClick = () => {
  gtag.event({
    action: 'click',
    category: 'Button',
    label: 'Comprar Producto',
    value: 100
  });
};
```

## 🐛 Solución de Problemas

### La etiqueta no envía datos

**✅ Checklist:**
- [ ] Las variables de entorno tienen el prefijo `NEXT_PUBLIC_`
- [ ] El `NEXT_PUBLIC_MEASUREMENT_ID` es correcto y comienza con `G-`
- [ ] Has reiniciado el servidor de desarrollo después de cambiar las variables
- [ ] Has redespliegado la aplicación en producción
- [ ] No tienes bloqueadores de anuncios o extensiones que bloqueen Analytics
- [ ] Espera 24-48 horas para ver datos históricos (los datos en tiempo real son inmediatos)

### Error: "analytics is not defined"
- Esto es normal si Firebase Analytics no está soportado en el navegador
- La implementación con gtag.js en `_document.js` seguirá funcionando

### Los datos no aparecen en Firebase
- Firebase Analytics y Google Analytics 4 están vinculados
- Los datos pueden tardar hasta 24 horas en aparecer en Firebase Console
- Verifica en Google Analytics primero (datos en tiempo real)

## 📚 Recursos Adicionales

- [Documentación de Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [Next.js + Google Analytics](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)

## 🎯 Próximos Pasos

1. ✅ Verifica que las variables de entorno estén configuradas
2. ✅ Reinicia tu servidor de desarrollo
3. ✅ Prueba la instalación con Tag Assistant
4. ✅ Redespliega en producción
5. ✅ Verifica los datos en tiempo real en Google Analytics

---

**Nota:** Si después de seguir estos pasos aún no ves datos, verifica que tu Measurement ID sea correcto y que no haya bloqueadores de anuncios activos.
