# Configuration EmailJS - Guide Complet

## Étape 1 : Créer un compte EmailJS

1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" 
3. Créez un compte avec votre email
4. Vérifiez votre email

## Étape 2 : Configurer un service email

1. Dans le dashboard, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Sélectionnez "Gmail"
4. Connectez votre compte Gmail (marcnzenang@gmail.com)
5. Donnez un nom au service (ex: "contact_service")
6. **Copiez le Service ID** (ex: service_xxxxxxx)

## Étape 3 : Créer un template d'email

1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Configurez le template :

**Subject:**
```
Nouveau message de contact - {{subject}}
```

**Content:**
```
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
```

4. **Copiez le Template ID** (ex: template_xxxxxxx)

## Étape 4 : Récupérer la clé publique

1. Allez dans "Account" > "General"
2. **Copiez la Public Key** (ex: xxxxxxxxxxxxxxxx)

## Étape 5 : Mettre à jour la configuration

Ouvrez le fichier `src/lib/emailjs-config.ts` et remplacez :

```typescript
export const EMAILJS_CONFIG = {
  serviceId: 'service_xxxxxxx', // Votre Service ID
  templateId: 'template_xxxxxxx', // Votre Template ID  
  publicKey: 'xxxxxxxxxxxxxxxx', // Votre Public Key
  toEmail: 'marcnzenang@gmail.com' // Email de destination
}
```

## Étape 6 : Tester

1. Redémarrez le serveur de développement
2. Allez sur la page de contact
3. Remplissez le formulaire
4. Cliquez sur "Envoyer le message"
5. Vérifiez votre boîte mail !

## Avantages d'EmailJS

- ✅ Envoi automatique d'emails
- ✅ Pas besoin de serveur backend
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Emails reçus directement dans votre boîte
- ✅ Configuration simple et rapide

## Limites gratuites

- 200 emails par mois
- 2 services email
- Templates illimités
- Support par email

Pour plus d'emails, passez au plan payant (à partir de 15$/mois).



