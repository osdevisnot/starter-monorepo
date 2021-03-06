/**
 * Simple setup script to be executed after degit finished cloning
 * Note: Shell commands, Writing files manually should be avoided.
 */
const path = require('path')
const fs = require('fs')
const sync = require('child_process').execSync

/**
 * Last portion of working directory....
 */
const cwd = path.join(__dirname)
const name = cwd.split(path.sep).pop()

const fromRoot = file => path.join(cwd, file)

/**
 * Write a README.md file
 */
fs.writeFileSync(fromRoot('README.md'), `#${name}\n\n`, 'utf-8')

/**
 * Rewrite files replacing starter name
 */
const rewriteFiles = ['package.json']
rewriteFiles.forEach(file => {
  const content = fs.readFileSync(fromRoot(file), 'utf-8')
  fs.writeFileSync(fromRoot(file), content.replace(/starter-monorepo/g, name), 'utf-8')
})

/**
 * Remove Files and Self destruct
 */
const files = ['packages/.gitkeep', '.travis.yml', 'setup.js']
files.forEach(file => fs.unlinkSync(fromRoot(file)))

/**
 * Add latest devDependencies and initialize git repo
 */
const commands = ['git init', 'git add .', 'git commit -am "first commit from starter-monorepo"', 'npm install']
commands.forEach(command => {
  console.log(`----- Executing Command -----> ${command}`)
  sync(command, { stdio: [0, 1, 2] })
})
