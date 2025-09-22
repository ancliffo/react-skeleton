import { UI_ComponentSet_MemberSerializer } from '../../serializedTypes/api.serializers';

export interface ComponentSetMemberProps<T> {
    apiPath: string | null
    callback: (updatedMembers: T[]) => void | null
    data: UI_ComponentSet_MemberSerializer
    dragHandleClass: string
}