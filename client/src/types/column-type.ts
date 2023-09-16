export interface Column {
    field: string;
    headerName: string;
    flex: number;
    renderCell?: (params: any) => void;
}
