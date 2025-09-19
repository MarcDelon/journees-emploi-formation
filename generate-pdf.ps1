# Script pour générer le PDF du rétroplanning
Write-Host "Génération du PDF du rétroplanning..." -ForegroundColor Green

# Chemin du fichier HTML
$htmlFile = "retroplanning.html"
$pdfFile = "retroplanning.pdf"

# Vérifier si le fichier HTML existe
if (Test-Path $htmlFile) {
    Write-Host "Fichier HTML trouvé: $htmlFile" -ForegroundColor Yellow
    
    # Ouvrir le fichier HTML dans le navigateur par défaut
    Write-Host "Ouverture du fichier HTML dans le navigateur..." -ForegroundColor Yellow
    Start-Process $htmlFile
    
    Write-Host ""
    Write-Host "✅ Instructions pour générer le PDF:" -ForegroundColor Green
    Write-Host "1. Le fichier HTML s'est ouvert dans votre navigateur" -ForegroundColor White
    Write-Host "2. Appuyez sur Ctrl+P pour ouvrir la boîte de dialogue d'impression" -ForegroundColor White
    Write-Host "3. Sélectionnez 'Enregistrer en PDF' comme destination" -ForegroundColor White
    Write-Host "4. Choisissez 'A4' comme format de page" -ForegroundColor White
    Write-Host "5. Désactivez les en-têtes et pieds de page" -ForegroundColor White
    Write-Host "6. Cliquez sur 'Enregistrer' et nommez le fichier 'retroplanning.pdf'" -ForegroundColor White
    Write-Host ""
    Write-Host "📄 Le fichier HTML est prêt pour la conversion en PDF!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur: Le fichier $htmlFile n'existe pas!" -ForegroundColor Red
}


