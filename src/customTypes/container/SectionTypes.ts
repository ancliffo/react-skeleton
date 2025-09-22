import { UI_SectionSerializer, UI_Section_ComponentSerializer, UI_Section_ComponentSetSerializer } from '../../serializedTypes/api.serializers';

export interface SectionProps<T> {
    i: any
    data: UI_SectionSerializer
    apiPath: string | null
    callback: () => void | null
    onHeightChange: (itemId:any, newHeightInPixels:number) => void | null
    dragHandleClass: string
}

export type SectionItem = UI_Section_ComponentSerializer | UI_Section_ComponentSetSerializer