

export interface SingleSelectProps<T> {
    name: string
    value?: "" | T | undefined
    options: T[] | null
    callback?: ((updatedItem: T[]) => void | null) | null
    label: string
    optionDisplayKey: string
    optionValueKey: string
    fullwidth: boolean
}