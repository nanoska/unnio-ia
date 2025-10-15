import AuthProvider from './components/AuthProvider';
import FloatingWidget from './components/FloatingWidget';
import DynamicBackground from './components/DynamicBackground';
import { Building2, Users, FileText, TrendingUp, Shield, Zap } from 'lucide-react';
import './animations.css';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen relative overflow-hidden">
        <DynamicBackground />

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform">
                  <Building2 size={32} className="text-white" />
                </div>
                <h1 className="text-5xl font-black text-gray-900">
                  UNNIO <span className="text-blue-600">ERP</span>
                </h1>
              </div>
              <p className="text-2xl text-gray-700 font-light mb-4">
                Asistente Virtual Inteligente para la gestión de tu empresa
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Revoluciona la gestión de tu empresa con nuestro asistente de IA.
                Gestiona documentación, empleados, consultas y acciones en un solo lugar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Gestión de Empleados</h3>
                <p className="text-gray-600 leading-relaxed">
                  Controla vacaciones, recibos, gastos, habilidades y cursos de todo tu equipo desde un único panel centralizado.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FileText className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Control Documental</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mantén todos los documentos organizados, con alertas de vencimiento y acceso rápido mediante búsqueda inteligente.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Reportes y Métricas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consulta métricas en tiempo real sobre empleados, documentos vencidos y estados de tu empresa al instante.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-cyan-100">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Acciones Automatizadas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Envía emails, notificaciones y carga documentos directamente desde el asistente con un solo clic.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seguridad Total</h3>
                <p className="text-gray-600 leading-relaxed">
                  Todos los datos están protegidos con encriptación y políticas de acceso granulares para máxima seguridad.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Chat Inteligente</h3>
                <p className="leading-relaxed opacity-90">
                  Conversa de forma natural con el asistente. Responde consultas complejas y guía a los usuarios paso a paso.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-blue-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Funcionalidades del Asistente
                  </h2>
                  <p className="text-gray-600">
                    Haz clic en el globo flotante para comenzar a interactuar
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Consultas Contextuales</h4>
                      <p className="text-sm text-gray-600">Pregunta sobre empleados, documentos y métricas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Envío de Emails</h4>
                      <p className="text-sm text-gray-600">Comunícate con usuarios desde el widget</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Carga de Documentos</h4>
                      <p className="text-sm text-gray-600">Sube archivos organizados por sección</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Búsqueda de Secciones</h4>
                      <p className="text-sm text-gray-600">Explora y navega por todo el sistema</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white">
                  <h4 className="font-bold text-xl mb-2">Modo Expandido</h4>
                  <p className="text-blue-100">
                    Haz clic una vez en el globo para abrir el chat compacto.
                    Usa el botón expandir para trabajar en pantalla completa con todas las funcionalidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloatingWidget />
      </div>
    </AuthProvider>
  );
}

export default App;
