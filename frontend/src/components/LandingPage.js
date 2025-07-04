import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, UserGroupIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import WaitlistForm from './WaitlistForm';
import VideoDemo from './VideoDemo';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>TuCoach AI - Domina entrevistas de programación con IA | Preparación para Entrevistas Técnicas</title>
        <meta name="description" content="Practica simulaciones realistas, recibe feedback instantáneo y análisis personalizado para maximizar tu confianza en entrevistas técnicas." />
        <meta name="keywords" content="entrevistas de trabajo, preparación laboral, IA, recién graduados, México, práctica de entrevistas, entrevistas técnicas" />
        <meta property="og:title" content="TuCoach AI - Domina entrevistas de programación con IA" />
        <meta property="og:description" content="Practica simulaciones realistas, recibe feedback instantáneo y análisis personalizado para maximizar tu confianza" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://piggy.precisionbytes.io" />
        <html lang="es-MX" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary">TuCoach AI</h1>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#como-funciona" className="text-gray-600 hover:text-primary transition-colors">¿Cómo funciona?</a>
                <a href="#beneficios" className="text-gray-600 hover:text-primary transition-colors">Beneficios</a>
                <a href="#demo" className="text-gray-600 hover:text-primary transition-colors">Demo</a>
                <a href="#lista-espera" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">Únete</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Domina entrevistas de <span className="text-primary">programación</span> con IA
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Practica simulaciones realistas, recibe feedback instantáneo y análisis personalizado para maximizar tu confianza.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#lista-espera" className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors">
                  Únete a la lista de espera
                </a>
                <a href="#demo" className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                  Ver Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir TuCoach AI?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                La plataforma más completa para dominar entrevistas técnicas de programación
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Preguntas Realistas</h3>
                <p className="text-gray-600">
                  Preguntas realistas inspiradas en entrevistas técnicas de empresas líderes del sector.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Feedback Inmediato</h3>
                <p className="text-gray-600">
                  Recibe feedback inmediato sobre eficiencia, claridad y calidad de tu código.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Progreso Personalizado</h3>
                <p className="text-gray-600">
                  Monitorea tu avance con métricas, historial y recomendaciones personalizadas.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-primary-light/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lista Personalizada</h3>
                <p className="text-gray-600">
                  Crea tu propia lista de problemas según nivel, tema o empresa objetivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-xl text-gray-600">
                Simple, efectivo y diseñado para tu éxito
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Selecciona tu Perfil</h3>
                <p className="text-gray-600">
                  Elige el tipo de entrevista (backend, frontend, DevOps) y nivel de experiencia
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Practica en Tiempo Real</h3>
                <p className="text-gray-600">
                  Conversa con nuestro entrevistador de IA en una simulación realista
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Recibe Feedback</h3>
                <p className="text-gray-600">
                  Obtén análisis detallado y consejos para mejorar en tu próxima entrevista real
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="text-xl text-gray-600">
                Historias reales de éxito de desarrolladores que transformaron su preparación
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Laura Méndez</h4>
                    <p className="text-gray-600 text-sm">Backend Developer en Amazon</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Las simulaciones se sentían como entrevistas reales. Gracias a eso, logré una oferta en Amazon."
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Diego Torres</h4>
                    <p className="text-gray-600 text-sm">Software Engineer en Google</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "El feedback de la IA me ayudó a mejorar mi comunicación técnica en semanas."
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Sofía Ramírez</h4>
                    <p className="text-gray-600 text-sm">Full Stack Developer en Microsoft</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Pude identificar mis debilidades y convertirlas en fortalezas antes de mis entrevistas."
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
                Mira TuCoach AI en acción
              </h2>
              <p className="text-xl text-gray-600">
                Descubre cómo nuestra IA te ayuda a prepararte para el éxito
              </p>
            </div>

            <VideoDemo 
              title="TuCoach AI - Demo de Entrevista Simulada"
              videoUrl="https://interviewmentor.training/static/promo_video.mp4"
              // thumbnailUrl="URL_DE_THUMBNAIL_OPCIONAL"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-xl text-gray-600">
                Resolvemos tus dudas sobre TuCoach AI
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Mis datos y código están seguros?
                </h3>
                <p className="text-gray-600">
                  Sí, usamos cifrado de extremo a extremo y almacenamos todo en servidores seguros con estándares de privacidad estrictos.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Qué tan buenas son las preguntas del simulador?
                </h3>
                <p className="text-gray-600">
                  Las preguntas son diseñadas por expertos y validadas con ejemplos reales de entrevistas en empresas top como Google, Meta y Amazon.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Cuánto cuesta usar el simulador?
                </h3>
                <p className="text-gray-600">
                  Ofrecemos un plan gratuito con funciones básicas. Los planes premium incluyen feedback avanzado y seguimiento personalizado.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Funciona en cualquier dispositivo o sistema operativo?
                </h3>
                <p className="text-gray-600">
                  Sí, el simulador está disponible vía web y funciona en computadoras, tabletas y móviles sin necesidad de instalación.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  ¿Qué tipo de soporte ofrecen si tengo problemas?
                </h3>
                <p className="text-gray-600">
                  Contamos con soporte por chat y correo 24/7, además de una base de ayuda con respuestas rápidas y tutoriales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Waitlist Section */}
        <section id="lista-espera" className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Únete a la Lista de Espera
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Sé de los primeros en acceder a TuCoach AI y llevar tu preparación de entrevistas al siguiente nivel
            </p>
            
            <WaitlistForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">TuCoach AI</h3>
              <p className="text-gray-400 mb-6">
                Tu entrenador de entrevistas con IA
              </p>
              <div className="flex justify-center space-x-6">
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
              <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
                © 2024 TuCoach AI. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
