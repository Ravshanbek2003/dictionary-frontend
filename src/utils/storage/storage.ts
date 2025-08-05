import {SetCredentialsParams} from './types'

class Storage {
  public setCredentials({token}: SetCredentialsParams) {
    if (token) {
      localStorage.setItem('ACCESS_TOKEN_DICTIONARY', `Bearer ${token}`)
    }
  }

  public removeCredentials() {
    localStorage.removeItem('ACCESS_TOKEN_DICTIONARY')
  }

  public getTokens(): {accessToken: string | null} {
    return {
      accessToken: localStorage.getItem('ACCESS_TOKEN_DICTIONARY'),
    }
  }
}

export const useStorage = new Storage()
