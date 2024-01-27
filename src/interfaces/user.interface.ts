export interface userInterface {
    email: string | null,
    id: string | null,
    loginErrorMessage?: string | undefined,
    registerErrorMessage?: string | undefined,
    displayName: string | null,
    nameLoading: boolean
}