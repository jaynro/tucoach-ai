import React, { useState } from 'react';
import { SignUp, useUser } from '@clerk/clerk-react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useClerk, setUseClerk] = useState(true);

  // Clerk integration
  const { user, isSignedIn } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here you would integrate with your backend API
      // For example:
      // await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // Simulate API call for now
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setIsLoading(false);
    }
  };

  // If using Clerk and user is signed in, show success
  if (isSignedIn && user && useClerk) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-green-600 mb-4">
          <CheckCircleIcon className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Bienvenido a la lista de espera!
        </h3>
        <p className="text-gray-600 mb-4">
          Te notificaremos tan pronto como TuCoach AI esté disponible.
        </p>
        <p className="text-sm text-gray-500">
          Mientras tanto, prepárate para revolucionar tu preparación de entrevistas.
        </p>
      </div>
    );
  }

  // If form was submitted successfully
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-green-600 mb-4">
          <CheckCircleIcon className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Bienvenido a la lista de espera!
        </h3>
        <p className="text-gray-600 mb-4">
          Te notificaremos tan pronto como TuCoach AI esté disponible.
        </p>
        <p className="text-sm text-gray-500">
          Mientras tanto, prepárate para revolucionar tu preparación de entrevistas.
        </p>
      </div>
    );
  }

  // Check if Clerk publishable key is properly configured
  const hasClerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY && 
                     process.env.REACT_APP_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder_replace_with_your_actual_clerk_key';

  // If Clerk is properly configured, show Clerk signup
  if (useClerk && hasClerkKey) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Únete a la Lista de Espera
          </h3>
          <p className="text-gray-600">
            Regístrate para ser de los primeros en acceder a TuCoach AI
          </p>
        </div>
        
        <div className="clerk-signup-container">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-0 p-0 bg-transparent",
                header: "hidden",
                headerTitle: "hidden", 
                headerSubtitle: "hidden",
                logoBox: "hidden",
                logoImage: "hidden",
                formButtonPrimary: "bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition-colors border-0",
                formFieldInput: "border-gray-300 focus:border-primary focus:ring-primary text-gray-900 bg-white placeholder-gray-500",
                footerActionLink: "text-primary hover:text-primary-dark",
                formFieldLabel: "text-gray-700 font-medium text-sm",
                form: "space-y-4",
                formField: "space-y-1",
                footer: "mt-4",
                footerAction: "text-center",
                footerActionText: "text-gray-600 text-sm",
                dividerLine: "bg-gray-300",
                dividerText: "text-gray-500 text-sm",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50 text-gray-700",
                socialButtonsBlockButtonText: "font-medium",
                formHeaderTitle: "hidden",
                formHeaderSubtitle: "hidden"
              },
              layout: {
                logoImageUrl: "/logo.svg",
                showOptionalFields: false,
                socialButtonsPlacement: "bottom"
              }
            }}
          />
        </div>

        <button
          onClick={() => setUseClerk(false)}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ¿Prefieres un formulario simple? Haz clic aquí
        </button>
      </div>
    );
  }

  // Fallback to simple email form
  return (
    <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Únete a la Lista de Espera
        </h3>
        <p className="text-gray-600">
          Regístrate para ser de los primeros en acceder a TuCoach AI
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
              placeholder="Nombre"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white placeholder-gray-500"
              placeholder="tu@email.com"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white"
            >
              <option value="backend">Backend</option>
              <option value="frontend">Frontend</option>
              <option value="devops">DevOps</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-white py-3 px-4 rounded-md hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Registrando...
            </div>
          ) : (
            'Unirme a la lista de espera'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        Al registrarte aceptas recibir correos relacionados con la beta. Puedes darte de baja en cualquier momento.
      </p>

      {hasClerkKey && (
        <button
          onClick={() => setUseClerk(true)}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ¿Prefieres registro completo? Haz clic aquí
        </button>
      )}
    </div>
  );
};

export default WaitlistForm;