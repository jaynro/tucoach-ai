import React from 'react';
import { SignUp, useUser } from '@clerk/clerk-react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const WaitlistForm = () => {
  // Clerk integration
  const { user, isSignedIn } = useUser();

  // If using Clerk and user is signed in, show success
  if (isSignedIn && user) {
    return (
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
        <div className="text-green-600 mb-4">
          <CheckCircleIcon className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          ¡Bienvenido a la lista de espera!
        </h3>
        <p className="text-gray-600 mb-4">
          Te notificaremos tan pronto como Interview Mentor esté disponible.
        </p>
        <p className="text-sm text-gray-500">
          Mientras tanto, prepárate para revolucionar tu preparación de entrevistas.
        </p>
      </div>
    );
  }

  // Show Clerk signup
  return (
    <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Únete a la Lista de Espera
        </h3>
        <p className="text-gray-600">
          Regístrate para ser de los primeros en acceder a Interview Mentor
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

      <p className="text-xs text-gray-400 text-center mt-6">
        Al registrarte aceptas recibir correos relacionados con la beta. Puedes darte de baja en cualquier momento.
      </p>
    </div>
  );
};

export default WaitlistForm;