export interface UserInfo {
  name: string,
  email: string,
  id?: number,
  pwd: string,
}

export interface CommonFile {
  id?: number,
  filePath: string,
  fileName: string,
}

export interface MaterialFile extends CommonFile {};

export interface Material {
  id?: number,
  title: string,
  description: string,
  files: MaterialFile[],
  category: Category,
  cover: MaterialFile,
  background: string,
  users: UserInfo[],
}

export interface Category{
  id?: number,
  name: string,
  description: string,
}
