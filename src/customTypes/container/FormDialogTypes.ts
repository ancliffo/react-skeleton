
export interface FormDialogProps<T> {
    title: string
    description: string
    openButtonLabel?: string
    openButton?: ((handleClickOpen:any) => React.ReactNode) | null | undefined
    submitButtonText: string
    children: React.ReactNode
    handleSubmitCallback: (event: any) => Promise<void>
    
}