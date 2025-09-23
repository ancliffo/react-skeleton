export interface DragDropGridProps<T> {
    gridContentDescriptor: string
    gridData: T[]
    gridWidth: number
    callback: (updatedGridData: T[]) => void | null
    colCount: number
    compactType: 'vertical' | 'horizontal' | null | undefined
    renderItem: (item: T, i:any) => React.ReactNode
    layout: any
    onLayoutChange: (newLayout:any) => void | null
    rowHeight: number
    dragHandleClass: string
}
export interface DraggableBoxProps<T> {
    item: T
    index: number
    moveItem: (from: number, to: number) => void
    renderItem: (item: T, index: number) => React.ReactNode
    xs:number
    sm:number
    md:number
};