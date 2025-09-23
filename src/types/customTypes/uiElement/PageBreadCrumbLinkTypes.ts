
export interface PageBreadCrumbLink {
    displayText: string,
    href: string
}

export interface PageBreadcrumbProps<T> {
    links: PageBreadCrumbLink[]
}
