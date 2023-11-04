
export type UsersinitialState = {
    users: Users[]
    isLogedIn: boolean
    isLogedOut: boolean
    error: null | string
    isLoading: boolean
    loggedUser: null | Users
    userRole: null | 'visitor' | 'admin'
    isEditForm: boolean,
    popUp: boolean 
  
  }
  
  export type Users = {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'visitor' | 'admin'
  }
  
  