import { UI_Section_ComponentSetSerializer } from '../../serializedTypes/api.serializers';

export interface SectionComponentSetProps<T> {
    apiPath: string | null
    callback: (updatedMembers: T[]) => void | null
    data: UI_Section_ComponentSetSerializer
    dragHandleClass: string
}