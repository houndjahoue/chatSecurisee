import Markdown from 'react-markdown';
import './politique.css';

const Politique = () => {
  const markdownContent = `## Politiques de Confidentialité
1. **Collecte des Données Personnelles**
  >  1.1 **Types de Données Collectées** : Nous collectons des informations telles que le nom d'utilisateur, l'adresse e-mail, le sexe, profession, Nationalité, et les messages échangés dans l'application

  >  1.2 **Méthodes de Collecte** : Les données sont collectées via le formulaire d'inscription, les interactions dans le chat, et les mises à jour du profil.

2. **Utilisation des Données**
  > 2.1 **Objectifs** : Les données sont utilisées pour fournir et améliorer nos services, personnaliser l'expérience utilisateur, et assurer la sécurité des comptes.

  > 2.2 **Durée de Conservation** : Les données sont conservées aussi longtemps que le compte est actif et nécessaires pour fournir les services.

3. **Sécurité des Données**
  > 3.1 **Mesures de Sécurité** : Nous utilisons le chiffrement de bout en bout pour sécuriser les communications et le hachage des mots de passe pour protéger les informations d'identification.

4. **Droits des Utilisateurs**
  > 4.1 **Accès et Modification** : Les utilisateurs peuvent accéder et mettre à jour leurs informations personnelles via les paramètres de leur compte.

5. **Modifications de la Politique de Confidentialité**
  > 5.1 **Notification des Changements** : Nous informerons les utilisateurs des modifications de notre politique de confidentialité via un e-mail et une notification dans l'application.

### Conseils de Bonnes Pratiques pour les Utilisateurs

1. **Choix d'un Mot de Passe Fort**

  1.1 Utilisez un mot de passe contenant au moins 8 caractères, incluant des lettres majuscules et minuscules, des chiffres et des symboles.

2. **Mise à Jour Régulière**

  2.1 Mettez à jour régulièrement votre mot de passe et assurez-vous que vos informations de contact sont à jour.

3. **Prudence avec les Liens et Fichiers**

  3.1 Ne cliquez pas sur des liens suspects et ne téléchargez pas de fichiers provenant d'utilisateurs que vous ne connaissez pas.

4. **Confidentialité des Informations Sensibles**

  4.1 Ne partagez pas vos informations personnelles sensibles dans les discussions publiques ou avec des utilisateurs inconnus.

5. **Déconnexion après Utilisation**

  5.1 Déconnectez-vous de votre compte lorsque vous utilisez des ordinateurs publics ou partagés pour éviter l'accès non autorisé.`;

  return (
    <div className="politique_container">
      <Markdown>{markdownContent}</Markdown>
    </div>
  );
};

export default Politique;
