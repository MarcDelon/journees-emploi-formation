// Configuration EmailJS
// Configuration temporaire pour les tests
// Remplacez ces valeurs par vos vraies clés EmailJS

export const EMAILJS_CONFIG = {
  serviceId: 'service_j0e9djo', // Service ID configuré
  templateId: 'template_is0183k', // Template ID configuré
  publicKey: 'EOIRtrF0ednlQqIaK', // Public Key configurée
  toEmail: 'marcnzenang@gmail.com' // Email de destination
}

// Configuration EmailJS pour éviter l'ouverture d'Outlook
// Remplacez les valeurs ci-dessus par vos vraies clés EmailJS
// Guide complet dans SETUP_EMAILJS.md

// Instructions de configuration :
// 1. Allez sur https://www.emailjs.com/
// 2. Créez un compte gratuit
// 3. Dans "Email Services", ajoutez Gmail
// 4. Dans "Email Templates", créez un template avec :
//    - Subject: Nouveau message de contact - {{subject}}
//    - Body: 
//      Nom: {{from_name}}
//      Email: {{from_email}}
//      Sujet: {{subject}}
//      Message: {{message}}
//      Newsletter: {{newsletter}}
// 5. Copiez vos clés et remplacez les valeurs ci-dessus

// Template d'email suggéré pour EmailJS :
/*
Sujet: Nouveau message de contact - {{subject}}

Bonjour,

Vous avez reçu un nouveau message de contact :

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

Newsletter: {{newsletter}}

Cordialement,
Système de contact automatique
*/
