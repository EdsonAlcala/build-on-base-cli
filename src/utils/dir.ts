import * as fs from 'fs'
import * as path from 'path'

export const ROOT_DIR = process.cwd()

export async function makeDir(root: string, options = { recursive: true }) {
  return await fs.promises.mkdir(root, options)
}

export async function isWriteable(root: string) {
  try {
    await fs.promises.access(root, fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}

export async function isRootDirWriteable() {
  return await isWriteable(ROOT_DIR)
}

export function getProjectDir(appDirLocation: string) {
  return path.join(ROOT_DIR, appDirLocation)
}
