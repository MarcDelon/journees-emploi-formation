const fs = require('fs')
const path = require('path')

// Function to parse .env.local file
function parseEnvFile() {
  const envPath = path.resolve('.env.local')
  console.log('Reading env file from:', envPath)
  
  const envContent = fs.readFileSync(envPath, 'utf8')
  console.log('File content:')
  console.log(envContent)
  
  const envVars = {}
  envContent.split('\n').forEach((line, index) => {
    console.log(`Line ${index}: "${line}"`)
    const [key, value] = line.split('=')
    if (key && value) {
      console.log(`  Key: "${key.trim()}", Value: "${value.trim()}"`)
      envVars[key.trim()] = value.trim()
    } else {
      console.log(`  Skipping line (no key=value format)`)
    }
  })
  
  console.log('Parsed env vars:', envVars)
  return envVars
}

parseEnvFile()