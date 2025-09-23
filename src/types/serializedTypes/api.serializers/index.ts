export interface UI_BehaviorSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    ValidationHint?: string | null;
    ValidationStrategy?: string | null;
    Description?: string | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_ComponentBehavior_MappingSerializer {
    id?: number;
    Component_id: number;
    Behavior_id: number;
    display_name?: null;
}

export interface UI_ComponentBehavior_MappingSerializer_aggregate {
    id?: number;
    Component_id?: UI_ComponentSerializer;
    Behavior_id?: UI_BehaviorSerializer;
    date_added?: string | null;
    lastmodified_date?: string | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_ComponentSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    FriendlyName?: string | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_ComponentSetSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    Description?: string | null;
    Locked?: boolean;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_ComponentSetSerializer_aggregate {
    id?: number;
    Name?: string | null;
    Description?: string | null;
}

export interface UI_ComponentSet_MemberSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    DisplayLabelText?: string | null;
    Enabled?: boolean;
    Visible?: boolean;
    Row?: number | null;
    Column?: number | null;
    Width?: number | null;
    Height?: number | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
    ComponentSet_id?: number | null;
    Component_Behavior_Mapping_id: number;
}

export interface UI_LayoutSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Layout?: any | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_PageSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    Description?: string | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
    Layout_id?: number | null;
}

export interface UI_PageSerializer_aggregate {
    id?: number;
    Name?: string | null;
    section_set?: UI_SectionSerializer_aggregate[];
}

interface UI_SectionSerializer_aggregate {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    DisplayText?: string | null;
    Row?: number | null;
    Column?: number | null;
    Enabled?: boolean;
    Visible?: boolean;
    added_by?: number | null;
    lastmodified_by?: number | null;
    Page_id: number;
    Appearance_id: number;
    Layout_id?: number | null;
}

export interface UI_SectionSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    DisplayText?: string | null;
    Row?: number | null;
    Column?: number | null;
    Enabled?: boolean;
    Visible?: boolean;
    added_by?: number | null;
    lastmodified_by?: number | null;
    Page_id: number;
    Appearance_id: number;
    Layout_id?: number | null;
}

interface UI_SectionSerializer_aggregate {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    DisplayText?: string | null;
    Row?: number | null;
    Column?: number | null;
    Enabled?: boolean;
    Visible?: boolean;
    added_by?: number | null;
    lastmodified_by?: number | null;
    Page_id: number;
    Appearance_id: number;
    Layout_id?: number | null;
}

export interface UI_Section_AppearanceSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    ReferenceName?: string | null;
    Border?: boolean;
    BorderWidth?: number | null;
    Panel?: boolean;
    Expandable?: boolean;
    added_by?: number | null;
    lastmodified_by?: number | null;
}

export interface UI_Section_ComponentSerializer {
    id?: number;
    date_added?: string | null;
    lastmodified_date?: string | null;
    Name?: string | null;
    DisplayLabelText?: string | null;
    Enabled?: boolean;
    Visible?: boolean;
    Row?: number | null;
    Column?: number | null;
    Width?: number | null;
    Height?: number | null;
    added_by?: number | null;
    lastmodified_by?: number | null;
    Section_id: number;
    Component_Behavior_Mapping_id: number;
}

export interface UI_Section_ComponentSetSerializer {
    id?: number;
    Section_id: number;
    ComponentSet_id?: number | null;
    Visible?: boolean;
    Layout_id?: number | null;
    display_name?: null;
}

