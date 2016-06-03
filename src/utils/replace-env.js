export default function replaceEnv(str) {
  return str.replace(/\$(\w+)/g, (_, env) => process.env[env])
}
