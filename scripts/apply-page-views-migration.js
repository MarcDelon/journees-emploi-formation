// Script pour appliquer la migration des page_views
function printPageViewsMigration() {
  const fs = require('fs')
  const path = require('path')
  const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '006_create_page_views.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  
  console.log('=== MIGRATION PAGE_VIEWS ===')
  console.log('Copiez le SQL ci-dessous dans l\'éditeur SQL de Supabase :')
  console.log('')
  console.log('--- COPY FROM BELOW INTO SUPABASE SQL EDITOR ---')
  console.log(sql)
  console.log('--- COPY UNTIL HERE ---')
  console.log('')
  console.log('🌐 Ouvrez: https://app.supabase.com/project/djapwzwglnsesokcsdle/sql')
  console.log('')
  console.log('✅ Après avoir exécuté le SQL, le système de tracking des vues sera actif !')
}

printPageViewsMigration()
