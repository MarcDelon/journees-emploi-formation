// Print the full migration SQL so it can be pasted into Supabase SQL editor
function printMigrationSQL() {
  const fs = require('fs')
  const path = require('path')
  const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_create_tables.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  console.log('--- COPY FROM BELOW INTO SUPABASE SQL EDITOR ---')
  console.log(sql)
  console.log('--- COPY UNTIL HERE ---')
  console.log('\nOpen: https://app.supabase.com/project/djapwzwglnsesokcsdle/sql')
}

printMigrationSQL()