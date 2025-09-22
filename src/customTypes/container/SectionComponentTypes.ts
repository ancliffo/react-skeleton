import { UI_Section_ComponentSerializer } from '../../serializedTypes/api.serializers';

export interface SectionComponentProps<T> {
    apiPath: string | null
    callback: (updatedMembers: T[]) => void | null
    data: UI_Section_ComponentSerializer
    dragHandleClass: string
}