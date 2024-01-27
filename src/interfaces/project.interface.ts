export interface projectInterface {
    projectList: {
        id: string,
        title: string,
        columns?: {
            id: string,
            title: string
        }[]
    }[],
    projectListError: string | undefined,
    loader: boolean
}