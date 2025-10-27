import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  ChartBarIcon,
  LightBulbIcon,
  DocumentTextIcon,
  TrophyIcon,
  FireIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  PuzzlePieceIcon,
  AdjustmentsHorizontalIcon,
  ScaleIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  StarIcon,
  ComputerDesktopIcon,
  RocketLaunchIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import WaitlistForm from './WaitlistForm';
import VideoDemo from './VideoDemo';
import { trackEvent } from '../utils/analytics';

const LandingPage = () => {
  const handleWaitlistClick = () => {
    trackEvent('engagement', 'click', 'hero-waitlist-button');
  };

  const handleDemoClick = () => {
    trackEvent('engagement', 'click', 'hero-demo-button');
  };

  const handleNavWaitlistClick = () => {
    trackEvent('engagement', 'click', 'nav-waitlist-button');
  };

  return (
    <>
      <Helmet>
        <title>Interview Mentor — Practica entrevistas técnicas con IA | Preparación para Entrevistas de Programación</title>
        <meta name="description" content="Interview Mentor: practica entrevistas técnicas con un entrevistador impulsado por IA. Recibe feedback inmediato, métricas de progreso y un plan de estudio personalizado." />
        <meta name="keywords" content="entrevistas técnicas, práctica de entrevistas, IA, recién graduados, México, Java, Spring, SQL, entrevistas de programación" />
        <meta property="og:title" content="Interview Mentor — Practica entrevistas técnicas con IA" />
        <meta property="og:description" content="Simula entrevistas reales, recibe feedback y acelera tu preparación con IA." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://piggy.precisionbytes.io" />
        <html lang="es-MX" />
        
        {/* Google Ads tracking */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17681750680"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17681750680');
          `}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img src="/logo_transparent.png" alt="Interview Mentor" className="h-8 w-auto" />
                <h1 className="text-2xl font-bold text-primary ml-3">Interview Mentor</h1>
              </div>
              <div className="hidden md:flex space-x-8 items-center">
                <a href="#como-funciona" className="text-gray-700 hover:text-accent transition-colors">Cómo funciona</a>
                <a href="#aprende" className="text-gray-700 hover:text-accent transition-colors">Aprende</a>
                <a href="#analitica" className="text-gray-700 hover:text-accent transition-colors">Analítica</a>
                <a href="#gamificacion" className="text-gray-700 hover:text-accent transition-colors">Gamificación</a>
                <a href="#demo" className="text-gray-700 hover:text-accent transition-colors">Demo</a>
                <a href="#lista-espera" onClick={handleNavWaitlistClick} className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-dark transition-colors font-semibold">Únete a la lista</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Prepárate para tu próxima entrevista técnica con <span className="text-accent">Interview Mentor</span>
              </h1>
              <p className="mt-5 text-xl text-gray-600">
                Practica con un entrevistador impulsado por IA que te evalúa, te entrena y te guía con un plan de estudio personalizado.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#lista-espera" onClick={handleWaitlistClick} className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-white px-6 py-3 text-lg font-semibold shadow hover:bg-accent-dark transition-colors">
                  <RocketLaunchIcon className="w-5 h-5" />
                  Únete a la lista de espera
                </a>
                <a href="#demo" onClick={handleDemoClick} className="inline-flex items-center justify-center rounded-xl border-2 border-accent text-accent px-6 py-3 text-lg font-semibold hover:bg-accent hover:text-white transition-colors">
                  Ver demo
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Tu práctica se convierte en progreso real: simula, recibe feedback, mide y mejora.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tu camino hacia el dominio técnico, paso a paso
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-center mb-4">
                  <CpuChipIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Simula entrevistas reales</h3>
                <p className="text-gray-600">
                  Habla con un entrevistador IA experto en Java, SQL, Spring o tu stack preferido.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-center mb-4">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Feedback personalizado</h3>
                <p className="text-gray-600">
                  Descubre fortalezas y áreas de mejora con retroalimentación inmediata.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm">
                <div className="flex justify-center mb-4">
                  <ArrowTrendingUpIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Evoluciona con cada sesión</h3>
                <p className="text-gray-600">
                  Guarda tu historial y observa cómo tu nivel aumenta con cada práctica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aprende, mejora y avanza */}
        <section id="aprende" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                No solo te entrevista, también te guía
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Interview Mentor genera rutas de aprendizaje y recomendaciones para tu crecimiento profesional.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <PuzzlePieceIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Plan de estudio personalizado</h3>
                <p className="text-gray-600">
                  Tras cada entrevista, obtén un roadmap con los temas que necesitas reforzar.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <DocumentTextIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Revisión inteligente de CV</h3>
                <p className="text-gray-600">
                  Analiza tu CV y recibe sugerencias para destacar tu experiencia técnica.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <AdjustmentsHorizontalIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Puntaje de preparación</h3>
                <p className="text-gray-600">
                  Un solo número que resume tu nivel actual por rol y seniority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Analítica */}
        <section id="analitica" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Convierte la práctica en progreso medible
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visualiza tu crecimiento con paneles y comparativas inteligentes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={require('../assets/dashboard_concept.png')}
                    alt="Dashboard de rendimiento - Interview Mentor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <ChartBarIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Dashboard</strong> con precisión, velocidad y confianza.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <FireIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Mapa de temas</strong> fuertes y débiles.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <ScaleIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Benchmark anónimo</strong> con otros usuarios.
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <VideoCameraIcon className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong className="text-gray-900">Reproducción de sesiones</strong> con observaciones.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feedback avanzado */}
        <section id="feedback" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Aprende con explicaciones reales, no solo correcciones
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <SpeakerWaveIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Feedback en audio</h3>
                <p className="text-gray-600">
                  Escucha explicaciones como si tuvieras un mentor real.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <StarIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Califica la retroalimentación</h3>
                <p className="text-gray-600">
                  Ayuda a que el sistema aprenda contigo y mejore su relevancia.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <ComputerDesktopIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Evaluación automática de código</h3>
                <p className="text-gray-600">
                  Analiza complejidad, eficiencia y buenas prácticas de tus soluciones.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <LightBulbIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Modo "Dame una pista"</h3>
                <p className="text-gray-600">
                  Recibe sugerencias antes de responder una pregunta difícil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gamificación */}
        <section id="gamificacion" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Convierte tu preparación en un juego de mejora continua
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Gana puntos, desbloquea logros y mantén tu motivación alta con gamificación inteligente.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <TrophyIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Insignias</h3>
                <p className="text-gray-600">
                  Spring Expert, System Design Challenger y más logros para desbloquear.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  <FireIcon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Rachas</h3>
                <p className="text-gray-600">
                  Mantén tu práctica diaria y gana recompensas por consistencia.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section id="demo" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Así se ve una entrevista con Interview Mentor
              </h2>
              <p className="text-xl text-gray-600">
                Observa cómo el entrevistador IA analiza respuestas y genera un plan de mejora personalizado.
              </p>
            </div>

            <VideoDemo 
              title="Interview Mentor - Demo de Entrevista Simulada"
              videoUrl="https://interviewmentor.training/static/promo_video.mp4"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  ¿Tiene costo?
                </h3>
                <p className="text-gray-600">
                  El acceso beta será gratuito para los primeros usuarios.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  ¿Qué tecnologías cubre?
                </h3>
                <p className="text-gray-600">
                  Java, SQL, Spring, Frontend y Cloud (con foco inicial en backend Java).
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  ¿Cuándo inicia la beta?
                </h3>
                <p className="text-gray-600">
                  Noviembre 2025. Te avisaremos por correo cuando tengas acceso.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  ¿Cómo protegen mis datos?
                </h3>
                <p className="text-gray-600">
                  Usamos infraestructura segura (AWS) y buenas prácticas de privacidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="lista-espera" className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sé de los primeros en acceder a Interview Mentor
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Regístrate y obtén beneficios exclusivos del lanzamiento beta.
              </p>
            </div>

            <ul className="grid md:grid-cols-2 gap-3 text-sm mb-8 max-w-2xl mx-auto">
              <li className="flex gap-2 items-center">
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
                <span>Acceso anticipado al beta</span>
              </li>
              <li className="flex gap-2 items-center">
                <BookOpenIcon className="w-5 h-5 flex-shrink-0" />
                <span>Checklist gratuito de preparación técnica</span>
              </li>
              <li className="flex gap-2 items-center">
                <CpuChipIcon className="w-5 h-5 flex-shrink-0" />
                <span>1 sesión de práctica gratis</span>
              </li>
              <li className="flex gap-2 items-center">
                <RocketLaunchIcon className="w-5 h-5 flex-shrink-0" />
                <span>Avanza en la lista al invitar amigos</span>
              </li>
            </ul>
            
            <WaitlistForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-dark text-white py-12 border-t border-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 items-center mb-8">
              <div className="flex items-center gap-2">
                <img src="/logo_transparent.png" alt="Interview Mentor" className="h-8 w-auto" />
                <span className="text-xl font-bold">Interview Mentor</span>
              </div>
              <div className="md:text-right text-sm">
                <a href="mailto:hola@interviewmentor.training" className="text-gray-300 hover:text-accent transition-colors">
                  hola@interviewmentor.training
                </a>
                <span className="mx-2 text-gray-500">•</span>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">LinkedIn</a>
                <span className="mx-2 text-gray-500">•</span>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">X</a>
                <span className="mx-2 text-gray-500">•</span>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">GitHub</a>
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center space-x-6 mb-6">
                <Link to="/app" className="text-gray-400 hover:text-white transition-colors">
                  Aplicación
                </Link>
                <a href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                  Privacidad
                </a>
                <a href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  Términos
                </a>
              </div>
              <div className="text-xs text-gray-400">
                © 2025 Interview Mentor. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
