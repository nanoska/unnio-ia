# UNNIO ERP - Asistente Virtual Inteligente

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-brightgreen)]()
[![React](https://img.shields.io/badge/React-18.2.0-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)]()
[![Vite](https://img.shields.io/badge/Vite-5.4.8-purple)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC)]()

## 📋 Descripción del Proyecto

**UNNIO ERP** es un asistente virtual inteligente diseñado para revolucionar la gestión empresarial mediante inteligencia artificial. Proporciona una interfaz conversacional intuitiva que permite a los usuarios interactuar de forma natural con el sistema de gestión empresarial.

### 🎯 Objetivo Principal

Crear una experiencia de usuario excepcional mediante un asistente de IA que entienda el lenguaje natural y proporcione respuestas contextuales inteligentes para tareas comunes de gestión empresarial como:
- Gestión de empleados y recursos humanos
- Control y gestión documental
- Reportes y métricas empresariales
- Comunicación automatizada por email
- Búsqueda y navegación inteligente

## 🚀 Características Principales

### ✨ Funcionalidades Implementadas

#### 🤖 Asistente Virtual Inteligente
- **Chat conversacional** con respuestas contextuales
- **Procesamiento de lenguaje natural** para consultas comunes
- **Respuestas inteligentes** basadas en palabras clave y contexto

#### 📧 Sistema de Comunicación
- **Envío de emails** con interfaz intuitiva
- **Formularios dinámicos** para diferentes tipos de comunicación
- **Simulación de envío** (modo demostración)

#### 📁 Gestión Documental
- **Carga de documentos** organizada por secciones
- **Selector de categorías** para clasificación automática
- **Simulación de upload** con feedback visual

#### 🔍 Búsqueda Avanzada
- **Navegación por secciones** empresariales
- **Búsqueda en tiempo real** con filtros
- **Interfaz intuitiva** para exploración del sistema

### 🎨 Características de UI/UX

#### Widget Flotante
- **Diseño elegante** con logo personalizado UNNIO
- **Animaciones sutiles** de latido y movimiento
- **Transiciones fluidas** entre modos
- **Posicionamiento inteligente** más centrado en pantalla

#### Interfaz Responsiva
- **Diseño mobile-first** completamente responsivo
- **Adaptación automática** a diferentes tamaños de pantalla
- **Experiencia táctil** optimizada para dispositivos móviles

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Biblioteca principal de interfaz de usuario
- **TypeScript 5.0+** - Tipado estático para mayor robustez
- **Vite 5.4.8** - Herramienta de construcción rápida y moderna
- **Tailwind CSS 3.4.0** - Framework de estilos utility-first

### Desarrollo y Herramientas
- **ESLint** - Linting de código
- **TypeScript** - Verificación de tipos en tiempo de compilación
- **Lucide React** - Iconografía moderna y consistente
- **CSS Animations** - Animaciones personalizadas y fluidas

### Arquitectura
- **Componentes modulares** altamente reutilizables
- **Estado reactivo** con hooks personalizados
- **Estilos utility-first** para mantenimiento fácil
- **Animaciones CSS** para experiencia fluida

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js** versión 16.0 o superior
- **npm** o **yarn** como gestor de paquetes

### Pasos de Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/nanoska/unnio-ia.git
cd unnio-ia/bolt/project-bolt-abssa-demo/project
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno (opcional):**
```bash
cp .env.example .env
# Editar .env según necesidades específicas
```

4. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

5. **Acceder a la aplicación:**
```
http://localhost:5173
```

### Comandos Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Construcción para producción
npm run build

# Preview del build de producción
npm run preview

# Verificación de tipos TypeScript
npm run typecheck

# Linting de código
npm run lint
```

## 🎯 Uso del Proyecto

### Acceso Inicial
1. Abre tu navegador y ve a `http://localhost:5173`
2. Verás la página principal con información sobre UNNIO ERP
3. Haz clic en el **globo flotante azul** en la esquina inferior derecha

### Interacción con el Asistente

#### Modo Chat
- **Conversación natural** escribiendo consultas
- **Respuestas inteligentes** sobre empleados, documentos, vacaciones
- **Ejemplos de consultas:**
  - "¿Cómo cargo documentación de empleados?"
  - "¿Cuántos empleados están inactivos?"
  - "¿Qué documentos vencen esta semana?"

#### Modo Acciones
- **Enviar emails** con formulario completo
- **Cargar documentos** con selección de sección
- **Interfaz intuitiva** para tareas administrativas

#### Modo Consultas
- **Exploración de secciones** empresariales
- **Búsqueda avanzada** con filtros
- **Navegación visual** del sistema organizacional

### Características Interactivas

#### Widget Flotante
- **Arrastrable** para reposicionar según preferencia
- **Animaciones sutiles** que llaman la atención sin distraer
- **Transiciones fluidas** entre diferentes modos

#### Navegación Intuitiva
- **Pestañas claras** para diferentes funcionalidades
- **Feedback visual** inmediato en todas las interacciones
- **Estados responsivos** que guían al usuario

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
project-root/
├── src/
│   ├── components/          # Componentes React reutilizables
│   │   ├── AuthProvider.tsx # Proveedor de autenticación
│   │   ├── DynamicBackground.tsx # Fondo dinámico animado
│   │   └── FloatingWidget.tsx   # Widget principal del asistente
│   ├── lib/                # Utilidades y configuración
│   │   └── supabase.ts     # Configuración de base de datos
│   ├── types/              # Definiciones TypeScript
│   │   └── widget.ts       # Tipos para el widget
│   ├── animations.css      # Animaciones CSS personalizadas
│   ├── App.tsx            # Componente raíz de la aplicación
│   └── main.tsx           # Punto de entrada de la aplicación
├── public/                # Archivos estáticos
├── index.html            # Template HTML
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración TypeScript
└── vite.config.ts       # Configuración de Vite
```

### Componentes Principales

#### FloatingWidget.tsx
- **Estado complejo** con múltiples modos de operación
- **Gestión de drag** suave y responsiva
- **Animaciones avanzadas** con CSS keyframes
- **Lógica de negocio** para diferentes funcionalidades

#### App.tsx
- **Layout principal** con fondo dinámico
- **Información institucional** sobre UNNIO ERP
- **Características destacadas** del producto
- **Integración completa** con el widget flotante

## 📊 Estado Actual del Proyecto

### ✅ Funcionalidades Completadas

#### Core Features
- [x] **Asistente virtual conversacional** con respuestas inteligentes
- [x] **Sistema de envío de emails** con formulario completo
- [x] **Gestión documental** con categorías organizadas
- [x] **Búsqueda avanzada** por secciones empresariales
- [x] **Widget flotante interactivo** con animaciones

#### UI/UX
- [x] **Diseño responsivo** para todos los dispositivos
- [x] **Animaciones fluidas** y transiciones suaves
- [x] **Logo personalizado UNNIO** integrado
- [x] **Interfaz intuitiva** y moderna

#### Desarrollo
- [x] **Configuración completa** de desarrollo
- [x] **Archivo .gitignore** optimizado
- [x] **TypeScript** completamente tipado
- [x] **Estructura modular** y mantenible

### 🚧 Próximas Mejoras Planificadas

#### Funcionalidades Futuras
- [ ] **Integración con base de datos real** (Supabase/PostgreSQL)
- [ ] **Sistema de autenticación** completo
- [ ] **API REST** para operaciones CRUD
- [ ] **WebSockets** para comunicación en tiempo real

#### Optimizaciones
- [ ] **Tests automatizados** (Jest + Testing Library)
- [ ] **Optimización de rendimiento** (lazy loading, code splitting)
- [ ] **PWA capabilities** para uso offline
- [ ] **Internacionalización** (i18n)

## 👨‍💻 Información del Desarrollador

**Proyecto desarrollado por:** [Nano Ska](https://github.com/nanoska)

**Tecnologías especializadas:**
- React avanzado con hooks personalizados
- TypeScript para desarrollo robusto
- CSS avanzado con animaciones personalizadas
- Arquitectura de componentes escalable

**Contacto:**
- GitHub: [nanoska](https://github.com/nanoska)
- Repositorio: [unnio-ia](https://github.com/nanoska/unnio-ia)

## 📄 Licencia

Este proyecto está desarrollado para fines demostrativos y educativos. Consulte con el desarrollador para usos comerciales o de producción.

## 🙏 Agradecimientos

- **UNNIO** por la oportunidad de desarrollar esta solución innovadora
- **Comunidad React** por las herramientas y bibliotecas excepcionales
- **Vite Team** por el framework de desarrollo ultrarrápido

---

**🚀 ¡Gracias por usar UNNIO ERP - El futuro de la gestión empresarial inteligente!**
