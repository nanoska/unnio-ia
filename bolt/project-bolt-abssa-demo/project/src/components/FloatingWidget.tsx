import { useState, useEffect, useRef } from 'react';
import { Send, Mail, Upload, Search, X, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage, ApplicationSection } from '../types/widget';

type WidgetMode = 'chat' | 'actions' | 'queries';
type DisplayMode = 'bubble' | 'compact' | 'expanded';

export default function FloatingWidget() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('bubble');
  const [mode, setMode] = useState<WidgetMode>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sections, setSections] = useState<ApplicationSection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const [emailForm, setEmailForm] = useState({ to: '', subject: '', body: '' });
  const [documentForm, setDocumentForm] = useState({ section: '', file: null as File | null });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const margin = 40; // More inward margin
    const centerX = window.innerWidth - 80 - margin;
    const centerY = window.innerHeight - 80 - margin;
    setPosition({ x: centerX, y: centerY });
  }, []);

  useEffect(() => {
    if (displayMode !== 'bubble') {
      loadMessages();
      loadSections();
    }
  }, [displayMode]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && displayMode === 'bubble') {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, displayMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (displayMode === 'bubble') {
      e.preventDefault(); // Prevent default browser drag behavior
      const rect = widgetRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsDragging(true);
      }
    }
  };

  const handleBubbleClick = () => {
    if (!isDragging && displayMode === 'bubble') {
      setDisplayMode('compact');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    // Mock messages for demo
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        user_id: 'demo-user',
        message: 'Hola, ¿cómo puedo cargar documentación de empleados?',
        message_type: 'user',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        user_id: 'demo-user',
        message: 'Para cargar documentación de empleados, ve a: Sistema > Empleados > [Seleccionar empleado] > Documentación. Puedo ayudarte a subirla desde la pestaña de Acciones.',
        message_type: 'assistant',
        created_at: new Date().toISOString(),
      },
    ];
    setMessages(mockMessages);
  };

  const loadSections = async () => {
    // Mock sections for demo
    const mockSections: ApplicationSection[] = [
      {
        id: '1',
        section_name: 'Recursos Humanos',
        section_description: 'Gestión de empleados, vacaciones y licencias',
        metadata: {},
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        section_name: 'Documentación',
        section_description: 'Control de documentos y archivos',
        metadata: {},
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        section_name: 'Reportes',
        section_description: 'Métricas y análisis de la empresa',
        metadata: {},
        created_at: new Date().toISOString(),
      },
    ];
    setSections(mockSections);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      user_id: 'demo-user',
      message: inputMessage,
      message_type: 'user',
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate assistant response
    const assistantResponse = generateResponse(inputMessage);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      user_id: 'demo-user',
      message: assistantResponse,
      message_type: 'assistant',
      created_at: new Date().toISOString(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      setInputMessage('');
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('documentación') || lowerInput.includes('documento')) {
      return 'Para cargar documentación de empleados, ve a: Sistema > Empleados > [Seleccionar empleado] > Documentación. Puedo ayudarte a subirla desde la pestaña de Acciones.';
    }
    if (lowerInput.includes('empleados inactivos') || lowerInput.includes('cuántos empleados')) {
      return 'Consultando empleados inactivos... Actualmente tienes 3 empleados en estado inactivo. ¿Deseas ver el detalle?';
    }
    if (lowerInput.includes('vencidos') || lowerInput.includes('vencieron')) {
      return 'En la última semana se vencieron 5 documentos: 2 certificados médicos, 2 contratos temporales y 1 habilitación. ¿Necesitas el listado completo?';
    }
    if (lowerInput.includes('vacaciones') || lowerInput.includes('licencias')) {
      return 'Puedes gestionar vacaciones en: Recursos Humanos > Gestión de Licencias > Solicitar Vacaciones. También puedo generar un reporte de días disponibles.';
    }
    if (lowerInput.includes('recibos') || lowerInput.includes('sueldo')) {
      return 'Los recibos de sueldo están disponibles en: Mi Perfil > Documentos > Recibos. Los empleados pueden descargarlos desde su portal personal.';
    }
    if (lowerInput.includes('email') || lowerInput.includes('correo') || lowerInput.includes('mail')) {
      return 'Puedo ayudarte a enviar un email. Ve a la pestaña de Acciones y completa el formulario de correo.';
    }

    return 'Soy el asistente de ABSSA. Puedo ayudarte con consultas sobre empleados, documentación, vacaciones, recibos, y más. También puedo enviar emails y cargar documentos. ¿Qué necesitas?';
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate email sending
    setTimeout(() => {
      alert('Email enviado correctamente (demo)');
      setEmailForm({ to: '', subject: '', body: '' });
      setIsLoading(false);
    }, 1500);
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentForm.file || !documentForm.section) return;

    setIsLoading(true);

    // Simulate document upload
    setTimeout(() => {
      alert('Documento cargado correctamente (demo)');
      setDocumentForm({ section: '', file: null });
      setIsLoading(false);
    }, 1500);
  };

  const filteredSections = sections.filter(section =>
    section.section_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.section_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = () => {
    setDisplayMode(displayMode === 'expanded' ? 'compact' : 'expanded');
  };

  const closeWidget = () => {
    setDisplayMode('bubble');
    setMode('chat');
    // Reset position to inward bottom-right corner
    const margin = 40;
    const centerX = window.innerWidth - 80 - margin;
    const centerY = window.innerHeight - 80 - margin;
    setPosition({ x: centerX, y: centerY });
  };

  if (displayMode === 'bubble') {
    return (
      <div
        ref={widgetRef}
        onMouseDown={handleMouseDown}
        onClick={handleBubbleClick}
        className="fixed w-16 h-16 bg-white rounded-full shadow-2xl cursor-move hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50 select-none animate-pulse-subtle"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          userSelect: 'none',
          animation: 'subtle-pulse 3s ease-in-out infinite, gentle-shake 4s ease-in-out infinite',
        }}
      >
        <img
          src="/logo-UNNIO.png"
          alt="UNNIO Logo"
          className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
        />
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-5 animate-pulse-gentle"></div>
      </div>
    );
  }

  const widgetClasses = displayMode === 'expanded'
    ? 'fixed inset-4 md:inset-8'
    : 'fixed bottom-6 right-6 w-80 h-[500px] sm:w-96 sm:h-[600px] md:w-[28rem] md:h-[32rem] lg:w-96 lg:h-[600px]';

  return (
    <div
      className={`${widgetClasses} bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 ${
        displayMode === 'compact' ? 'animate-widget-appear' : ''
      } ${displayMode === 'expanded' ? 'animate-widget-expand' : ''}`}
      style={{
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1)',
        transformOrigin: 'center center',
      }}
    >
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <img
              src="/logo-UNNIO.png"
              alt="UNNIO Logo"
              className="w-6 h-6 object-contain filter brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">Asistente UNNIO</h3>
            <p className="text-xs text-blue-100">Siempre aquí para ayudarte</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={toggleExpand}
            className="hover:bg-white/20 rounded-lg p-2 transition-all duration-200 backdrop-blur-sm"
            title={displayMode === 'expanded' ? 'Contraer' : 'Expandir'}
          >
            {displayMode === 'expanded' ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={closeWidget}
            className="hover:bg-white/20 rounded-lg p-2 transition-all duration-200 backdrop-blur-sm"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex border-b bg-gray-50/50">
        <button
          onClick={() => setMode('chat')}
          className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
            mode === 'chat'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {mode === 'chat' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          )}
          Chat
        </button>
        <button
          onClick={() => setMode('actions')}
          className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
            mode === 'actions'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {mode === 'actions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          )}
          Acciones
        </button>
        <button
          onClick={() => setMode('queries')}
          className={`flex-1 py-3 px-4 font-medium transition-all duration-300 relative ${
            mode === 'queries'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {mode === 'queries' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          )}
          Consultas
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/30 to-white relative">
        {mode === 'chat' && (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex-1 p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <img
                    src="/logo-UNNIO.png"
                    alt="UNNIO Logo"
                    className="w-12 h-12 mx-auto mb-3 opacity-30 filter brightness-0 invert"
                  />
                  <p className="text-sm">Inicia una conversación</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.message_type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200 hover:shadow-lg ${
                      msg.message_type === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                        : 'bg-white text-gray-800 border border-gray-100'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-3 sm:p-4 bg-white border-t shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Send size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {mode === 'actions' && (
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-fade-in">
            <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <Mail className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Enviar Email</h4>
              </div>
              <form onSubmit={handleSendEmail} className="space-y-3">
                <input
                  type="email"
                  placeholder="Destinatario"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="Asunto"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                  required
                />
                <textarea
                  placeholder="Mensaje"
                  value={emailForm.body}
                  onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 sm:h-28 resize-none shadow-sm transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 sm:py-3 text-sm sm:text-base rounded-xl transition-all duration-200 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Enviar Email
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50/30 border border-green-100 rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <Upload className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Cargar Documento</h4>
              </div>
              <form onSubmit={handleUploadDocument} className="space-y-3">
                <select
                  value={documentForm.section}
                  onChange={(e) => setDocumentForm({ ...documentForm, section: e.target.value })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
                  required
                >
                  <option value="">Selecciona una sección</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.section_name}>
                      {section.section_name}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={(e) => setDocumentForm({ ...documentForm, file: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 sm:py-3 text-sm sm:text-base rounded-xl transition-all duration-200 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Cargar Documento
                </button>
              </form>
            </div>
          </div>
        )}

        {mode === 'queries' && (
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar secciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              {filteredSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
                >
                  <h5 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{section.section_name}</h5>
                  <p className="text-xs sm:text-sm text-gray-600">{section.section_description}</p>
                </div>
              ))}
            </div>

            {filteredSections.length === 0 && (
              <div className="text-center text-gray-400 py-8 sm:py-12">
                <Search size={40} className="mx-auto mb-2 sm:mb-3 opacity-30" />
                <p className="text-xs sm:text-sm">No se encontraron secciones</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
